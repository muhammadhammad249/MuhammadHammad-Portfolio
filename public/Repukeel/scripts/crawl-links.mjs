import http from 'http';

const BASE_URL = 'http://localhost:3000';

function fetchPage(urlPath) {
  return new Promise((resolve) => {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `${BASE_URL}${urlPath}`;
    const req = http.get(fullUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data,
          location: res.headers.location || null,
        });
      });
    });
    req.on('error', (err) => {
      resolve({ status: 0, error: err.message, data: '' });
    });
  });
}

async function main() {
  console.log('--- Starting Comprehensive Link Crawl ---');

  const visited = new Set();
  const queue = ['/', '/sitemap.xml'];
  const allInternalLinks = new Set();
  const allExternalLinks = new Set();
  const issues = [];

  // Old patterns to forbid
  const forbiddenPatterns = [
    '/scanner',
    'repukeel.vercel.app',
    '/blogs/online-reputation-management-how-repukeel-helps-you-remove-bad-reviews-and-protect-your-brand',
    '/blogs/onlyfans-content-leaked-how-to-remove-it-fast-and-protect-your-privacy',
    '/blogs/brand-ip-protection-how-to-safeguard-your-business-online',
    '/blogs/dmca-takedown-claims-explained-how-to-remove-stolen-content-online',
    '/blogs/how-to-remove-fake-google-reviews-a-complete-guide-by-repukeel',
    '/blogs/how-to-report-and-remove-a-fake-impersonating-profile-online',
    '/blogs/how-to-remove-your-mugshot-from-google-repukeel-s-complete-guide',
    '/blogs/social-media-takedowns-how-to-remove-harassing-or-fake-content-fast',
    '/blogs/how-to-remove-trustpilot-reviews-legally-repukeel-s-expert-guide',
  ];

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    const res = await fetchPage(current);
    if (res.status === 0) {
      issues.push({ page: current, issue: `Failed to fetch: ${res.error}` });
      continue;
    }
    if (res.status >= 400) {
      issues.push({ page: current, issue: `HTTP ${res.status}` });
      continue;
    }
    if (res.status >= 300 && res.status < 400) {
      issues.push({ page: current, issue: `Redirects (HTTP ${res.status}) -> ${res.location}` });
      continue;
    }

    // Extract links
    const text = res.data;
    if (current === '/sitemap.xml') {
      const locRegex = /<loc>(.*?)<\/loc>/g;
      let match;
      while ((match = locRegex.exec(text)) !== null) {
        const u = match[1].replace('https://repukeel.com', '');
        const target = u === '' ? '/' : u;
        if (!visited.has(target)) queue.push(target);
      }
      continue;
    }

    // Normal HTML page
    const hrefRegex = /href=["']([^"']+)["']/g;
    let match;
    while ((match = hrefRegex.exec(text)) !== null) {
      let href = match[1];

      // Check forbidden patterns
      for (const fp of forbiddenPatterns) {
        if (href.includes(fp)) {
          issues.push({
            page: current,
            issue: `Links to forbidden/old pattern: ${href}`,
          });
        }
      }

      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
        continue;
      }

      if (href.startsWith('http://') || href.startsWith('https://')) {
        if (href.startsWith('https://repukeel.com')) {
          href = href.replace('https://repukeel.com', '');
          if (!href.startsWith('/')) href = '/' + href;
          allInternalLinks.add(href);
          if (!visited.has(href)) queue.push(href);
        } else if (href.startsWith('http://localhost:3000')) {
          href = href.replace('http://localhost:3000', '');
          if (!href.startsWith('/')) href = '/' + href;
          allInternalLinks.add(href);
          if (!visited.has(href)) queue.push(href);
        } else {
          allExternalLinks.add(href);
        }
      } else if (href.startsWith('/')) {
        // Internal path
        const cleanHref = href.split('#')[0].split('?')[0];
        allInternalLinks.add(cleanHref);
        if (!visited.has(cleanHref)) {
          queue.push(cleanHref);
        }
      }
    }
  }

  console.log(`Visited ${visited.size} pages/routes.`);
  console.log(`Discovered ${allInternalLinks.size} internal links.`);
  console.log(`Discovered ${allExternalLinks.size} external links:`);
  for (const ext of allExternalLinks) {
    console.log(`  - ${ext}`);
  }

  if (issues.length === 0) {
    console.log('✅ ZERO link errors or forbidden patterns found across entire crawl!');
  } else {
    console.log(`❌ Found ${issues.length} link issues:`);
    console.log(JSON.stringify(issues, null, 2));
  }
}

main();
