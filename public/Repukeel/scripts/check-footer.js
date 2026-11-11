const fs = require('fs');
const path = require('path');

// Extract links from Footer.tsx
const footerPath = path.join(__dirname, '..', 'frontend', 'src', 'app', 'components', 'Footer.tsx');
if (!fs.existsSync(footerPath)) {
  console.error(`Error: Footer file not found at ${footerPath}`);
  process.exit(1);
}

const content = fs.readFileSync(footerPath, 'utf8');

// Match <Link href="..." ...>Anchor</Link> and <a href="..." ...>Anchor</a>
const linkRegex = /<(?:Link|a)[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/(?:Link|a)>/gi;
const hrefToAnchors = {};
let match;

while ((match = linkRegex.exec(content)) !== null) {
  const href = match[1];
  // Strip inner HTML/SVG tags and whitespace from anchor text
  const rawText = match[2].replace(/<[^>]+>/g, '').trim();
  if (!rawText) continue; // Skip image/icon links

  if (!hrefToAnchors[href]) {
    hrefToAnchors[href] = [];
  }
  hrefToAnchors[href].push(rawText);
}

console.log('=== Footer Href to Anchors Mapping ===');
let hasDuplicates = false;

for (const [href, anchors] of Object.entries(hrefToAnchors)) {
  const uniqueAnchors = [...new Set(anchors)];
  console.log(`${href} -> [${anchors.join(', ')}]`);
  if (uniqueAnchors.length > 1) {
    console.warn(`  [WARNING] Multiple distinct anchors pointing to same href: ${uniqueAnchors.join(' vs ')}`);
    hasDuplicates = true;
  }
}

if (hasDuplicates) {
  console.error('\nFAILED: Duplicate anchors found pointing to identical href targets.');
  process.exit(1);
} else {
  console.log('\nPASSED: All footer hrefs have unique, consistent anchor text.');
  process.exit(0);
}
