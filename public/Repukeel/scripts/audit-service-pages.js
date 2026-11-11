const fs = require('fs');
const path = require('path');

const servicesPath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'services.ts');
const fileContent = fs.readFileSync(servicesPath, 'utf8');

// Match category and its subservices
const routes = [];
const catMatches = fileContent.split(/\{\s*slug:\s*["']([^"']+)["'],\s*name:\s*["'][^"']+["'],\s*icon:/);

for (let i = 1; i < catMatches.length; i += 2) {
  const catSlug = catMatches[i];
  const chunk = catMatches[i + 1] || '';
  const subMatches = chunk.matchAll(/slug:\s*["']([^"']+)["'],\s*name:/g);
  for (const m of subMatches) {
    routes.push(`/${catSlug}/${m[1]}`);
  }
}

console.log(`Extracted ${routes.length} service subroutes.`);

async function audit() {
  const rows = ['URL,H1,Word Count,Has FAQ,Has Process Section'];
  const pageData = [];

  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3000' + r);
      if (res.status !== 200) {
        console.error(`Route ${r} returned status ${res.status}`);
        continue;
      }
      const html = await res.text();

      // Extract H1
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/,/g, ';') : 'N/A';

      // Extract main / body content excluding nav and footer
      let bodyText = '';
      const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      if (mainMatch) {
        bodyText = mainMatch[1];
      } else {
        bodyText = html.replace(/<header[\s\S]*?<\/header>/gi, '')
                       .replace(/<footer[\s\S]*?<\/footer>/gi, '')
                       .replace(/<nav[\s\S]*?<\/nav>/gi, '');
      }

      const cleanText = bodyText
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<svg[\s\S]*?<\/svg>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
      const hasFaq = /faq|frequently asked/i.test(html) ? 'Yes' : 'No';
      const hasProcess = /how it works|process|our workflow|our process|step 1/i.test(html) ? 'Yes' : 'No';

      rows.push(`"${r}","${h1}",${words},${hasFaq},${hasProcess}`);
      pageData.push({ url: r, h1, words, hasFaq, hasProcess });
    } catch (err) {
      console.error(`Failed to audit ${r}:`, err.message);
    }
  }

  const csvPath = path.join(__dirname, '..', 'seo', 'service-pages.csv');
  fs.writeFileSync(csvPath, rows.join('\n'));
  console.log(`Saved ${pageData.length} records to seo/service-pages.csv`);

  // Sort ascending by word count
  pageData.sort((a, b) => a.words - b.words);

  const thinPages = pageData.filter(p => p.words < 250);
  const avgWords = Math.round(pageData.reduce((acc, p) => acc + p.words, 0) / (pageData.length || 1));

  let md = `# SEO-10: Thin Service Pages Inventory\n\n`;
  md += `**Date**: 26 Oct 2026  \n`;
  md += `**Total Service Routes Audited**: ${pageData.length}  \n`;
  md += `**Average Body Word Count**: ${avgWords} words  \n`;
  md += `**Thin Threshold**: < 250 words  \n`;
  md += `**Identified Thin Pages Count**: ${thinPages.length}  \n\n`;
  md += `> [!IMPORTANT]\n`;
  md += `> Per SEO operating rules, the agent does NOT invent facts, guarantees, or service copy. The human client must provide real service facts and process steps for thin pages before copy is added.\n\n`;
  md += `## Lowest Word Count Pages (< 250 words)\n\n`;
  md += `| Route | H1 | Word Count | Has FAQ | Has Process | Required Human Facts |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  for (const p of thinPages) {
    md += `| \`${p.url}\` | ${p.h1} | ${p.words} | ${p.hasFaq} | ${p.hasProcess} | Platform policy nuances, realistic timeframe, case documentation requirements |\n`;
  }

  md += `\n## Sample Well-Covered Pages (Highest Word Count)\n\n`;
  for (const p of pageData.slice(-5)) {
    md += `- \`${p.url}\`: ${p.h1} (${p.words} words)\n`;
  }

  const mdPath = path.join(__dirname, '..', 'seo', 'thin-pages.md');
  fs.writeFileSync(mdPath, md);
  console.log(`Saved thin pages analysis to seo/thin-pages.md`);
}

audit();
