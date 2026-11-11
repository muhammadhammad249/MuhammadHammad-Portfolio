const routes = [
  '/', '/about', '/contact', '/clients', '/case-studies', '/pricing',
  '/privacy-policy', '/terms-conditions', '/faq', '/protection',
  '/request-free-analysis', '/blogs', '/scanner', '/services',
  '/content-removal', '/content-removal/google-review-removal'
];

async function check() {
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3000' + r);
      const html = await res.text();
      const m = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
      console.log(r, '->', m ? m[0] : 'NO CANONICAL FOUND');
    } catch (e) {
      console.log(r, 'ERROR', e.message);
    }
  }
}
check();
