const fs = require('fs');
const path = require('path');

function walk(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === '.next') continue;
    if (fs.statSync(full).isDirectory()) walk(full, list);
    else if (/\.(tsx|ts|jsx|js|html)$/.test(f)) list.push(full);
  }
  return list;
}

const files = walk(path.join(__dirname, '..', 'frontend', 'src'));
let totalReplacements = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace Repukeel or REPUKEEL when NOT preceded by:
  // - https://
  // - http://
  // - mailto:
  // - @
  // - /
  // And NOT part of a slug (e.g. "slug": "...-repukeel-...")
  // In blogs/data.ts, replace "Repukeel" in titles, metas, and html content, but preserve the slug string:
  if (file.endsWith('data.ts')) {
    // Replace in title, meta, content
    content = content.replace(/"title":\s*"([^"]*)"/g, (match, p1) => {
      return `"title": "${p1.replace(/\bRepukeel\b|\bREPUKEEL\b/g, 'RepuKeel')}"`;
    });
    content = content.replace(/"meta":\s*"([^"]*)"/g, (match, p1) => {
      return `"meta": "${p1.replace(/\bRepukeel\b|\bREPUKEEL\b/g, 'RepuKeel')}"`;
    });
    content = content.replace(/"content":\s*"([\s\S]*?)"(?=\s*\}|\s*,\s*"\w+":)/g, (match, p1) => {
      return `"content": "${p1.replace(/\bRepukeel\b|\bREPUKEEL\b/g, 'RepuKeel')}"`;
    });
  } else {
    // In all other tsx/ts files:
    // Replace standalone Repukeel or REPUKEEL
    // Avoid replacing inside URLs and email addresses
    content = content.replace(/(?<!https?:\/\/[\w\.\/]*|mailto:[\w\.\/]*|@[\w\.\/]*|\/)\b(Repukeel|REPUKEEL)\b(?![\w\.\/]*\.com)/g, (match) => {
      return 'RepuKeel';
    });
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    const rel = path.relative(path.join(__dirname, '..'), file);
    console.log(`Updated brand name in: ${rel}`);
    totalReplacements++;
  }
}

console.log(`\nCompleted brand consistency update across ${totalReplacements} files.`);
