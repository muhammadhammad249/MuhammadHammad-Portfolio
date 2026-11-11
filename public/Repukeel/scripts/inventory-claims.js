const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'frontend', 'src');

function walk(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === '.next') continue;
    if (fs.statSync(full).isDirectory()) {
      walk(full, list);
    } else if (/\.(tsx|ts|jsx|js|json|md)$/.test(f)) {
      list.push(full);
    }
  }
  return list;
}

const files = walk(root);
const rows = ['File,Line,Exact Text,Page URL / Context,Issue / Conflict,Needs Human Answer'];

const checks = [
  {
    regex: /John Doe/i,
    issue: 'Placeholder Testimonial Name',
    question: 'Replace with real verified client name or remove testimonial?'
  },
  {
    regex: /\b(24hrs?|24\s*hours?)\b.*(avg|removal|time)|avg.*removal.*time/i,
    issue: 'Turnaround Time Claim (Conflicts with 24-72h in FAQ)',
    question: 'Confirm exact turnaround time representation (24h vs 24-72h in FAQ).'
  },
  {
    regex: /2K\+/i,
    issue: 'Client Volume Metric Conflict (2K+ vs hundreds of creators)',
    question: 'Which client volume metric is accurate (2,000+ or hundreds)?'
  },
  {
    regex: /hundreds of (creators|brands|clients)/i,
    issue: 'Client Volume Metric Conflict (hundreds vs 2K+)',
    question: 'Harmonize with 2K+ or keep as general descriptive phrasing?'
  },
  {
    regex: /(98%|99%)/i,
    issue: 'Success / Satisfaction Rate Claim (98-99% Success/Satisfaction)',
    question: 'Do you have verification/substantiation for 98-99% success rate?'
  },
  {
    regex: /\b4\.9(★|\s*out|\s*Rating|$)|4\.96/i,
    issue: 'Review Star Rating Claim (4.9★ / 4.96 out of 5)',
    question: 'What is the verifiable review profile source (Google, Trustpilot, etc.)?'
  },
  {
    regex: /No Win,?\s*No Fee/i,
    issue: 'Guarantee Claim (No Win No Fee vs Results-Driven / Retainer)',
    question: 'Does RepuKeel offer strict No-Win-No-Fee or standard fee-for-service?'
  },
  {
    regex: /500K\+/i,
    issue: 'High-Volume Removal Claim (500K+ content pieces/takedowns)',
    question: 'Is 500K+ verified across past company cases?'
  }
];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Skip svg path definition lines and inputs
    if (line.includes('<path') || line.includes(' d=') || line.includes('svgPaths') || line.includes('viewBox')) return;
    if (line.includes('type="text"') && line.includes('placeholder=')) return;

    for (const c of checks) {
      if (c.regex.test(line)) {
        const cleanLine = line.trim().replace(/,/g, ';').replace(/"/g, '""');
        const relPath = path.relative(path.join(__dirname, '..'), f).replace(/\\/g, '/');
        rows.push(`"${relPath}",${idx + 1},"${cleanLine}","${relPath}","${c.issue}","${c.question}"`);
        break;
      }
    }
  });
}

const outPath = path.join(__dirname, '..', 'seo', 'claims-inventory.csv');
fs.writeFileSync(outPath, rows.join('\n'));
console.log('Wrote', rows.length - 1, 'refined claims to', outPath);
