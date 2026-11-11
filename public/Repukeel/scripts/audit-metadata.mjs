import http from 'http';

const BASE_URL = 'http://localhost:3000';

function fetchPage(urlPath) {
  return new Promise((resolve) => {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `${BASE_URL}${urlPath}`;
    http.get(fullUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data,
        });
      });
    }).on('error', (err) => {
      resolve({ status: 0, error: err.message, data: '' });
    });
  });
}

async function getSitemapUrls() {
  const res = await fetchPage('/sitemap.xml');
  const locs = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(res.data)) !== null) {
    locs.push(match[1].replace('https://repukeel.com', '') || '/');
  }
  return locs;
}

async function audit() {
  console.log('--- Starting Metadata & JSON-LD Audit ---');
  const urls = await getSitemapUrls();
  console.log(`Auditing ${urls.length} URLs from sitemap...`);

  const results = [];
  const titleMap = new Map();
  const descMap = new Map();

  for (const path of urls) {
    const page = await fetchPage(path);
    if (page.status !== 200) {
      results.push({ path, issue: `Status ${page.status}` });
      continue;
    }

    const html = page.data;

    // 1. Title
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : null;

    // 2. Description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const desc = descMatch ? descMatch[1] : null;

    // 3. H1 count
    const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];

    // 4. Canonical
    const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                       html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
    const canonical = canonMatch ? canonMatch[1] : null;

    // 5. OpenGraph
    const ogTitle = (html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i) || [])[1];
    const ogDesc = (html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i) || [])[1];
    const ogUrl = (html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i) || [])[1];
    const ogType = (html.match(/<meta[^>]*property=["']og:type["'][^>]*content=["']([^"']*)["']/i) || [])[1];

    // 6. JSON-LD
    const jsonLdScripts = [];
    const ldRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let ldMatch;
    while ((ldMatch = ldRegex.exec(html)) !== null) {
      try {
        const parsed = JSON.parse(ldMatch[1]);
        jsonLdScripts.push(parsed);
      } catch (err) {
        results.push({ path, issue: `Invalid JSON-LD syntax: ${err.message}` });
      }
    }

    // Checks
    const pageIssues = [];

    // Title checks
    if (!title) {
      pageIssues.push('Missing <title>');
    } else {
      if (title.includes('RepuKeel | RepuKeel')) {
        pageIssues.push(`Duplicate brand in title: "${title}"`);
      }
      if (titleMap.has(title)) {
        pageIssues.push(`Duplicate title with ${titleMap.get(title)}: "${title}"`);
      } else {
        titleMap.set(title, path);
      }
    }

    // Description checks
    if (!desc) {
      pageIssues.push('Missing meta description');
    } else {
      if (descMap.has(desc)) {
        pageIssues.push(`Duplicate description with ${descMap.get(desc)}`);
      } else {
        descMap.set(desc, path);
      }
    }

    // H1 check
    if (h1Matches.length !== 1) {
      pageIssues.push(`H1 count is ${h1Matches.length} (expected exactly 1)`);
    }

    // Canonical check
    const expectedCanonical = path === '/' ? 'https://repukeel.com' : `https://repukeel.com${path.replace(/\/+$/, '')}`;
    if (!canonical) {
      pageIssues.push('Missing canonical tag');
    } else if (canonical !== expectedCanonical) {
      pageIssues.push(`Canonical mismatch: got "${canonical}", expected "${expectedCanonical}"`);
    }

    // Blog og:type check
    if (path.startsWith('/blogs/') && path !== '/blogs') {
      if (ogType !== 'article') {
        pageIssues.push(`Blog post og:type is "${ogType}" (expected "article")`);
      }
    }

    if (pageIssues.length > 0) {
      results.push({ path, title, descLength: desc?.length, issues: pageIssues });
    }
  }

  console.log(`\nAudit completed across ${urls.length} pages.`);
  if (results.length === 0) {
    console.log('✅ ALL PAGES PASS METADATA & JSON-LD AUDIT!');
  } else {
    console.log(`❌ Found ${results.length} pages with issues:`);
    console.log(JSON.stringify(results, null, 2));
  }
}

audit();
