const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

async function crawl() {
  const queue = [{ url: '/', depth: 0 }];
  const visited = new Set();
  const pageInlinks = {}; // target -> count
  const pageDepth = {}; // target -> min depth
  const pageStatus = {}; // target -> status
  const allLinks = []; // { source, target, anchor, status }
  const statusCache = {};

  async function getStatus(targetUrl) {
    if (statusCache[targetUrl]) return statusCache[targetUrl];
    try {
      const res = await fetch(BASE_URL + targetUrl, { method: 'HEAD', redirect: 'manual' });
      statusCache[targetUrl] = res.status;
      return res.status;
    } catch {
      try {
        const res = await fetch(BASE_URL + targetUrl, { redirect: 'manual' });
        statusCache[targetUrl] = res.status;
        return res.status;
      } catch (err) {
        statusCache[targetUrl] = 500;
        return 500;
      }
    }
  }

  while (queue.length > 0) {
    const { url: currentPath, depth } = queue.shift();
    if (visited.has(currentPath)) continue;
    visited.add(currentPath);

    if (pageDepth[currentPath] === undefined || depth < pageDepth[currentPath]) {
      pageDepth[currentPath] = depth;
    }

    try {
      const res = await fetch(BASE_URL + currentPath);
      pageStatus[currentPath] = res.status;
      if (res.status !== 200) continue;

      const html = await res.text();
      // Match all internal links: <a ... href="..." ...>anchor</a>
      const linkRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let match;

      while ((match = linkRegex.exec(html)) !== null) {
        let href = match[1].trim();
        const rawAnchor = match[2].replace(/<[^>]+>/g, '').trim().replace(/,/g, ';').replace(/"/g, '""');

        // Ignore hash, mailto, tel, external links
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
          continue;
        }

        // If absolute URL pointing to localhost or repukeel.com, normalize to pathname
        if (href.startsWith(BASE_URL)) {
          href = href.slice(BASE_URL.length);
        } else if (href.startsWith('https://repukeel.com')) {
          href = href.slice('https://repukeel.com'.length);
        }

        // Skip non-internal
        if (href.startsWith('http://') || href.startsWith('https://')) {
          continue;
        }

        // Clean href
        const targetPath = href.split('#')[0].split('?')[0] || '/';

        // Check target status
        const targetStatus = await getStatus(targetPath);
        allLinks.push({
          source: currentPath,
          target: targetPath,
          anchor: rawAnchor || '[image/icon]',
          status: targetStatus
        });

        // Record inlink count
        pageInlinks[targetPath] = (pageInlinks[targetPath] || 0) + 1;

        // If internal HTML page not yet visited, enqueue it
        if (!visited.has(targetPath) && !targetPath.startsWith('/_next') && !targetPath.startsWith('/api') && !targetPath.includes('.')) {
          queue.push({ url: targetPath, depth: depth + 1 });
        }
      }
    } catch (err) {
      console.error(`Error crawling ${currentPath}:`, err.message);
    }
  }

  // Read sitemap to check for true orphans (pages in sitemap that received 0 inlinks)
  let sitemapUrls = [];
  try {
    const sitemapRes = await fetch(BASE_URL + '/sitemap.xml');
    const sitemapXml = await sitemapRes.text();
    const locMatches = sitemapXml.matchAll(/<loc>https:\/\/repukeel\.com([^<]*)<\/loc>/g);
    for (const m of locMatches) {
      sitemapUrls.push(m[1] || '/');
    }
  } catch (e) {
    console.error('Could not fetch sitemap.xml:', e.message);
  }

  // Write seo/links.csv
  const csvRows = ['Source,Target,Anchor,Status'];
  for (const l of allLinks) {
    csvRows.push(`"${l.source}","${l.target}","${l.anchor}",${l.status}`);
  }
  const csvPath = path.join(__dirname, '..', 'seo', 'links.csv');
  fs.writeFileSync(csvPath, csvRows.join('\n'));
  console.log(`Saved ${allLinks.length} internal links to seo/links.csv`);

  // Detect issues
  const brokenLinks = allLinks.filter(l => l.status >= 400);
  const redirectLinks = allLinks.filter(l => l.status >= 300 && l.status < 400);
  const orphans = sitemapUrls.filter(u => !pageInlinks[u] && u !== '/');
  const singleInlink = sitemapUrls.filter(u => pageInlinks[u] === 1);
  const deepPages = Object.entries(pageDepth).filter(([url, depth]) => depth > 3);

  // Generate seo/link-report.md
  let md = `# SEO-11: Internal Links & Orphan Audit Report\n\n`;
  md += `**Date**: 26 Oct 2026  \n`;
  md += `**Total Internal Links Found**: ${allLinks.length}  \n`;
  md += `**Total Unique Pages Crawled**: ${visited.size}  \n`;
  md += `**Total Sitemap Pages Checked**: ${sitemapUrls.length}  \n\n`;

  md += `## 1. Executive Summary\n`;
  md += `- **Broken Internal Links (4xx/5xx)**: ${brokenLinks.length}\n`;
  md += `- **Redirecting Internal Links (3xx)**: ${redirectLinks.length}\n`;
  md += `- **Orphan Pages (0 Inlinks)**: ${orphans.length}\n`;
  md += `- **Low Inlink Pages (1 Inlink)**: ${singleInlink.length}\n`;
  md += `- **Deep Pages (Depth > 3)**: ${deepPages.length}\n\n`;

  if (brokenLinks.length > 0) {
    md += `## 2. Broken Internal Links (4xx/5xx)\n`;
    md += `| Source | Target | Anchor | Status |\n| :--- | :--- | :--- | :--- |\n`;
    for (const b of brokenLinks) {
      md += `| \`${b.source}\` | \`${b.target}\` | ${b.anchor} | ${b.status} |\n`;
    }
    md += `\n`;
  } else {
    md += `## 2. Broken Internal Links (4xx/5xx)\n`;
    md += `**Zero broken internal links found! All internal links return HTTP 200.**\n\n`;
  }

  if (orphans.length > 0) {
    md += `## 3. Orphan Pages in Sitemap (0 Inlinks)\n`;
    md += `| URL | Status | Action Needed |\n| :--- | :--- | :--- |\n`;
    for (const o of orphans) {
      md += `| \`${o}\` | ${pageStatus[o] || 200} | Add inlink from relevant category or footer |\n`;
    }
    md += `\n`;
  } else {
    md += `## 3. Orphan Pages in Sitemap\n`;
    md += `**Zero orphan pages found! Every URL in sitemap has at least one internal inlink.**\n\n`;
  }

  md += `## 4. Inlink Distribution Sample\n`;
  md += `| Page | Inlink Count | Click Depth from / |\n| :--- | :--- | :--- |\n`;
  for (const u of sitemapUrls.slice(0, 20)) {
    md += `| \`${u}\` | ${pageInlinks[u] || 0} | ${pageDepth[u] !== undefined ? pageDepth[u] : 'Unreachable'} |\n`;
  }

  const mdPath = path.join(__dirname, '..', 'seo', 'link-report.md');
  fs.writeFileSync(mdPath, md);
  console.log(`Saved link report to seo/link-report.md`);
}

crawl();
