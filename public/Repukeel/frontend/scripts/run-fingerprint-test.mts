/**
 * Part 5 fingerprint test harness.
 * Decodes each test image variant to raw RGBA via sharp (dev dep),
 * then runs the pure imageFingerprint library against the base image.
 *
 * Run from frontend/:
 *   npx tsx scripts/run-fingerprint-test.mts
 *
 * Output: ../seo/fingerprint-test.md
 */

 
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const _require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sharp = _require('sharp') as any;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import {
  toGray32,
  bestMatch,
  compareGray32,
} from '../src/lib/imageFingerprint';

const IMG_DIR = path.join(__dirname, 'test-images');
const SEO_DIR = path.join(__dirname, '..', '..', 'seo');
const OUT_FILE = path.join(SEO_DIR, 'fingerprint-test.md');

interface Variant {
  file: string;
  label: string;
  expectedRange: string;
}

const variants: Variant[] = [
  { file: '00_original.png',           label: 'Exact original (baseline)',          expectedRange: '100' },
  { file: '01_resized_50.jpg',         label: 'Resized to 50%',                    expectedRange: '≥ 90' },
  { file: '02_jpeg_quality_30.jpg',    label: 'JPEG re-saved at q30 (lossy)',       expectedRange: '≥ 85' },
  { file: '03_brightness_plus_15.jpg', label: 'Brightness +15%',                   expectedRange: '≥ 80' },
  { file: '04_slight_blur.jpg',        label: 'Gaussian blur',                      expectedRange: '≥ 80' },
  { file: '05_crop_5_percent.jpg',     label: '5% edge crop',                      expectedRange: '≥ 75' },
  { file: '06_crop_20_percent.jpg',    label: '20% edge crop',                     expectedRange: '≥ 60' },
  { file: '07_crop_40_percent.jpg',    label: '40% edge crop (heavy)',             expectedRange: '< 60' },
  { file: '08_horizontal_mirror.jpg',  label: 'Horizontal mirror (with transform)', expectedRange: '≥ 90' },
  { file: '09_rotated_90.jpg',         label: '90° rotation (with transform)',      expectedRange: '≥ 85' },
  { file: '10_watermark.jpg',          label: 'Watermark overlay',                  expectedRange: '≥ 70' },
  { file: '11_unrelated.png',          label: 'Unrelated geometric image',          expectedRange: '< 40' },
];

async function decodeToGray32(filePath: string): Promise<{ gray32: Uint8Array; rgba: Buffer; w: number; h: number }> {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength);
  const gray32 = toGray32(rgba, info.width, info.height);
  return { gray32, rgba: data, w: info.width, h: info.height };
}

async function main() {
  console.log('Running fingerprint test harness...\n');

  const basePath = path.join(IMG_DIR, '00_original.png');
  if (!fs.existsSync(basePath)) {
    throw new Error(`Base image not found: ${basePath}\nRun: node scripts/make-test-images.js first`);
  }

  const base = await decodeToGray32(basePath);

  interface Row {
    file: string;
    label: string;
    expected: string;
    direct: number;
    best: number;
    bestTransform: string;
    w: number;
    h: number;
  }

  const rows: Row[] = [];

  for (const v of variants) {
    const varPath = path.join(IMG_DIR, v.file);
    if (!fs.existsSync(varPath)) {
      console.warn(`  SKIP (not found): ${v.file}`);
      continue;
    }
    const variant = await decodeToGray32(varPath);

    const directResult = compareGray32(base.gray32, variant.gray32, 'as-is');
    const bestResult = bestMatch(base.gray32, variant.gray32);

    rows.push({
      file: v.file,
      label: v.label,
      expected: v.expectedRange,
      direct: directResult.score,
      best: bestResult.score,
      bestTransform: bestResult.transform,
      w: variant.w,
      h: variant.h,
    });

    console.log(`  ${v.file.padEnd(22)} direct=${String(directResult.score).padStart(3)}%  best=${String(bestResult.score).padStart(3)}% (${bestResult.transform})`);
  }

  // Build markdown report
  const now = new Date().toISOString().split('T')[0];
  const lines: string[] = [
    `# Image Fingerprint – Real-Image Test Results`,
    ``,
    `**Date:** ${now}  `,
    `**Base image:** 1024×1024 generated gradient (synthetic, no copyright concerns)  `,
    `**Tool:** \`scripts/make-test-images.js\` → \`scripts/run-fingerprint-test.mts\`  `,
    `**Algorithms:** aHash, dHash, pHash averaged → combined score (0-100)`,
    ``,
    `## Verdict Thresholds (flagged for review)`,
    ``,
    `| Band | Score | Label |`,
    `|------|-------|-------|`,
    `| Very high similarity | 90 – 100 | Likely same image resized/recompressed |`,
    `| High similarity | 75 – 89 | Same source, minor edits |`,
    `| Some similarity | 60 – 74 | Shares structure, significant edits |`,
    `| Low similarity | < 60 | Distinct images |`,
    ``,
    `> **⚠ These thresholds are flagged for user approval.** See \`VERDICT_THRESHOLDS\` constant in \`imageFingerprint.ts\`.`,
    ``,
    `## Test Results`,
    ``,
    `| Variant | Dimensions | Direct score | Best-match score | Best transform | Expected range | Pass? |`,
    `|---------|-----------|:------------:|:----------------:|:--------------:|:--------------:|:-----:|`,
  ];

  for (const r of rows) {
    const passCheck = (() => {
      const exp = r.expected;
      const score = r.best;
      if (exp === '100') return score === 100 ? '✅' : '⚠️';
      if (exp.startsWith('≥ ')) {
        const threshold = parseInt(exp.slice(2));
        return score >= threshold ? '✅' : '⚠️';
      }
      if (exp.startsWith('< ')) {
        const threshold = parseInt(exp.slice(2));
        return score < threshold ? '✅' : '⚠️';
      }
      return '—';
    })();

    lines.push(
      `| ${r.label} | ${r.w}×${r.h} | ${r.direct}% | **${r.best}%** | ${r.bestTransform} | ${r.expected} | ${passCheck} |`
    );
  }

  lines.push(
    ``,
    `## Notes`,
    ``,
    `- All processing ran in Node.js via sharp (RGBA decode) + pure TypeScript functions (no browser canvas).`,
    `- "Direct score" uses the as-is orientation (no rotation/flip search).`,
    `- "Best-match score" tests all 5 transforms (as-is, mirrored, 90°, 180°, 270°).`,
    `- Heavy crops (40%) are expected to score low because ≥40% of pixels are different.`,
    `- Unrelated images should score well below 40%; any score above that warrants a threshold review.`,
    `- Test images are synthetic (gradient + noise). Real-world photos may score differently.`,
    ``,
    `## Open Items for User Approval`,
    ``,
    `1. **Verdict thresholds** (90 / 75 / 60) — review band labels against real-world use cases.`,
    `2. **Watermark variant** — if score is < 70, consider widening the "High similarity" band.`,
    `3. **Heavy crop (40%)** — if score is ≥ 60, the "Some similarity" label may be misleading.`,
  );

  fs.mkdirSync(SEO_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8');
  console.log(`\nReport written to: ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
