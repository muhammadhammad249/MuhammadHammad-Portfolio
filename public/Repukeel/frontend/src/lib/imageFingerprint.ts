/**
 * Image Fingerprint Comparison Algorithms
 * Pure client-side TypeScript implementation of perceptual image hashes:
 * - Average Hash (aHash)
 * - Difference Hash (dHash)
 * - Perceptual Discrete Cosine Transform Hash (pHash)
 */

export const VERDICT_THRESHOLDS = {
  VERY_HIGH: 90,
  HIGH: 75,
  SOME: 60,
} as const;

export type TransformType = 'as-is' | 'mirrored' | 'rotated-90' | 'rotated-180' | 'rotated-270';

export interface HashDetail {
  hexA: string;
  hexB: string;
  distance: number;
  similarity: number;
}

export interface ComparisonResult {
  score: number;
  verdict: string;
  aHash: HashDetail;
  dHash: HashDetail;
  pHash: HashDetail;
  transform: TransformType;
}

export interface BestMatchResult extends ComparisonResult {
  bestScore: number;
}

export interface TrimResult {
  rgba: Uint8Array | Uint8ClampedArray;
  width: number;
  height: number;
  trimmed: boolean;
}

// Convert 64 boolean bits to a 16-character hex string
function bitsToHex(bits: boolean[]): string {
  let hex = '';
  for (let i = 0; i < 64; i += 4) {
    const nibble =
      (bits[i] ? 8 : 0) |
      (bits[i + 1] ? 4 : 0) |
      (bits[i + 2] ? 2 : 0) |
      (bits[i + 3] ? 1 : 0);
    hex += nibble.toString(16);
  }
  return hex;
}

/**
 * aHash: Downscales 32x32 grayscale to 8x8 using 4x4 block averaging.
 * Computes mean intensity; bits represent pixels strictly above average.
 */
export function aHash(gray32: Uint8Array): string {
  const vals = new Float64Array(64);
  let sum = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      let blockSum = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          blockSum += gray32[(r * 4 + i) * 32 + (c * 4 + j)];
        }
      }
      const val = blockSum / 16;
      vals[r * 8 + c] = val;
      sum += val;
    }
  }
  const avg = sum / 64;
  const bits = new Array<boolean>(64);
  for (let k = 0; k < 64; k++) {
    bits[k] = vals[k] > avg;
  }
  return bitsToHex(bits);
}

/**
 * dHash: Downscales 32x32 grayscale to 9 columns by 8 rows.
 * Compares adjacent horizontal neighbors; bit is 1 if left pixel is brighter.
 */
export function dHash(gray32: Uint8Array): string {
  const colStarts = [0, 4, 7, 11, 14, 18, 21, 25, 28];
  const colEnds = [4, 7, 11, 14, 18, 21, 25, 28, 32];
  const vals = new Float64Array(72);
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 9; c++) {
      let cellSum = 0;
      let count = 0;
      for (let y = r * 4; y < (r + 1) * 4; y++) {
        for (let x = colStarts[c]; x < colEnds[c]; x++) {
          cellSum += gray32[y * 32 + x];
          count++;
        }
      }
      vals[r * 9 + c] = cellSum / count;
    }
  }
  const bits = new Array<boolean>(64);
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      bits[r * 8 + c] = vals[r * 9 + c] > vals[r * 9 + (c + 1)];
    }
  }
  return bitsToHex(bits);
}

// Precomputed cosine factors for separable 32-point Discrete Cosine Transform
const COS_TABLE = new Float64Array(32 * 8);
for (let n = 0; n < 32; n++) {
  for (let k = 0; k < 8; k++) {
    COS_TABLE[n * 8 + k] = Math.cos(((2 * n + 1) * k * Math.PI) / 64);
  }
}

/**
 * pHash: Computes 2D DCT of 32x32 input, extracts top-left 8x8 low frequencies.
 * Excludes DC term from AC median; bit is 1 if coefficient is above median.
 */
export function pHash(gray32: Uint8Array): string {
  const rowTransformed = new Float64Array(32 * 8);
  for (let y = 0; y < 32; y++) {
    for (let u = 0; u < 8; u++) {
      let s = 0;
      for (let x = 0; x < 32; x++) {
        s += gray32[y * 32 + x] * COS_TABLE[x * 8 + u];
      }
      rowTransformed[y * 8 + u] = s;
    }
  }

  const dct = new Float64Array(64);
  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      let s = 0;
      for (let y = 0; y < 32; y++) {
        s += rowTransformed[y * 8 + u] * COS_TABLE[y * 8 + v];
      }
      dct[v * 8 + u] = s;
    }
  }

  const ac = new Float64Array(63);
  let idx = 0;
  for (let k = 1; k < 64; k++) {
    ac[idx++] = dct[k];
  }
  ac.sort();
  const median = ac[31];

  const bits = new Array<boolean>(64);
  for (let k = 0; k < 64; k++) {
    bits[k] = dct[k] > median;
  }
  return bitsToHex(bits);
}

/**
 * Computes Hamming distance between two 16-character hex strings (0 to 64).
 */
export function hammingDistance(hexA: string, hexB: string): number {
  let dist = 0;
  for (let i = 0; i < 16; i++) {
    const a = parseInt(hexA[i] || '0', 16);
    const b = parseInt(hexB[i] || '0', 16);
    let xor = a ^ b;
    while (xor > 0) {
      dist += xor & 1;
      xor >>= 1;
    }
  }
  return dist;
}

/**
 * Calculates similarity percentage from Hamming distance: Math.round((1 - distance/64) * 100).
 */
export function similarity(distance: number): number {
  return Math.round((1 - distance / 64) * 100);
}

/**
 * Returns guidance verdict label for similarity percentage.
 */
export function verdict(score: number): string {
  if (score >= VERDICT_THRESHOLDS.VERY_HIGH) return 'Very high similarity';
  if (score >= VERDICT_THRESHOLDS.HIGH) return 'High similarity';
  if (score >= VERDICT_THRESHOLDS.SOME) return 'Some similarity';
  return 'Low similarity';
}

/**
 * Transforms a 32x32 grayscale array according to orientation.
 */
export function transformGray32(src: Uint8Array, transform: TransformType): Uint8Array {
  if (transform === 'as-is') return src;
  const dst = new Uint8Array(1024);
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      let sx = x;
      let sy = y;
      if (transform === 'mirrored') {
        sx = 31 - x;
        sy = y;
      } else if (transform === 'rotated-90') {
        sx = y;
        sy = 31 - x;
      } else if (transform === 'rotated-180') {
        sx = 31 - x;
        sy = 31 - y;
      } else if (transform === 'rotated-270') {
        sx = 31 - y;
        sy = x;
      }
      dst[y * 32 + x] = src[sy * 32 + sx];
    }
  }
  return dst;
}

/**
 * Compares two 32x32 grayscale images and returns hashes, distances, and scores.
 */
export function compareGray32(
  grayA: Uint8Array,
  grayB: Uint8Array,
  transform: TransformType = 'as-is'
): ComparisonResult {
  const aA = aHash(grayA);
  const aB = aHash(grayB);
  const dA = dHash(grayA);
  const dB = dHash(grayB);
  const pA = pHash(grayA);
  const pB = pHash(grayB);

  const distA = hammingDistance(aA, aB);
  const distD = hammingDistance(dA, dB);
  const distP = hammingDistance(pA, pB);

  const simA = similarity(distA);
  const simD = similarity(distD);
  const simP = similarity(distP);
  const score = Math.round((simA + simD + simP) / 3);

  return {
    score,
    verdict: verdict(score),
    aHash: { hexA: aA, hexB: aB, distance: distA, similarity: simA },
    dHash: { hexA: dA, hexB: dB, distance: distD, similarity: simD },
    pHash: { hexA: pA, hexB: pB, distance: distP, similarity: simP },
    transform,
  };
}

/**
 * Computes the combined score (average of three similarities, rounded) for two 32x32 grayscale images.
 */
export function combinedScore(grayA: Uint8Array, grayB: Uint8Array): number {
  return compareGray32(grayA, grayB).score;
}

/**
 * Compares image A against image B as-is, mirrored, rotated 90/180/270 and returns the best score.
 */
export function bestMatch(grayA: Uint8Array, grayB: Uint8Array): BestMatchResult {
  const transforms: TransformType[] = [
    'as-is',
    'mirrored',
    'rotated-90',
    'rotated-180',
    'rotated-270',
  ];

  let best: ComparisonResult | null = null;

  for (const t of transforms) {
    const transformedB = transformGray32(grayB, t);
    const result = compareGray32(grayA, transformedB, t);
    if (!best || result.score > best.score) {
      best = result;
    }
  }

  return {
    ...best!,
    bestScore: best!.score,
  };
}

/**
 * Converts RGBA pixels to a 32x32 grayscale Uint8Array with area averaging.
 * Composites transparent pixels onto white first using luminance 0.299R + 0.587G + 0.114B.
 */
export function toGray32(
  rgba: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number
): Uint8Array {
  const gray32 = new Uint8Array(1024);
  const xRatio = width / 32;
  const yRatio = height / 32;

  for (let dy = 0; dy < 32; dy++) {
    const syStart = Math.floor(dy * yRatio);
    const syEnd = Math.min(height, Math.floor((dy + 1) * yRatio) || syStart + 1);

    for (let dx = 0; dx < 32; dx++) {
      const sxStart = Math.floor(dx * xRatio);
      const sxEnd = Math.min(width, Math.floor((dx + 1) * xRatio) || sxStart + 1);

      let sumLuminance = 0;
      let count = 0;

      for (let sy = syStart; sy < syEnd; sy++) {
        for (let sx = sxStart; sx < sxEnd; sx++) {
          const idx = (sy * width + sx) * 4;
          const r = rgba[idx];
          const g = rgba[idx + 1];
          const b = rgba[idx + 2];
          const a = rgba[idx + 3] / 255;

          // Composite onto white background
          const rComp = r * a + 255 * (1 - a);
          const gComp = g * a + 255 * (1 - a);
          const bComp = b * a + 255 * (1 - a);

          sumLuminance += 0.299 * rComp + 0.587 * gComp + 0.114 * bComp;
          count++;
        }
      }

      gray32[dy * 32 + dx] = count > 0 ? Math.round(sumLuminance / count) : 255;
    }
  }

  return gray32;
}

/**
 * Removes outer rows and columns whose pixels are within a small tolerance of one solid color.
 * Never trims more than 25% of any side.
 */
export function trimPlainBorders(
  rgba: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
  tolerance = 15
): TrimResult {
  const maxTrimX = Math.floor(width * 0.25);
  const maxTrimY = Math.floor(height * 0.25);

  const r0 = rgba[0];
  const g0 = rgba[1];
  const b0 = rgba[2];

  function pixelMatches(x: number, y: number): boolean {
    const idx = (y * width + x) * 4;
    return (
      Math.abs(rgba[idx] - r0) <= tolerance &&
      Math.abs(rgba[idx + 1] - g0) <= tolerance &&
      Math.abs(rgba[idx + 2] - b0) <= tolerance
    );
  }

  function rowMatches(y: number, xStart: number, xEnd: number): boolean {
    for (let x = xStart; x < xEnd; x++) {
      if (!pixelMatches(x, y)) return false;
    }
    return true;
  }

  function colMatches(x: number, yStart: number, yEnd: number): boolean {
    for (let y = yStart; y < yEnd; y++) {
      if (!pixelMatches(x, y)) return false;
    }
    return true;
  }

  let top = 0;
  while (top < maxTrimY && rowMatches(top, 0, width)) {
    top++;
  }

  let bottom = 0;
  while (bottom < maxTrimY && rowMatches(height - 1 - bottom, 0, width)) {
    bottom++;
  }

  let left = 0;
  while (left < maxTrimX && colMatches(left, top, height - bottom)) {
    left++;
  }

  let right = 0;
  while (right < maxTrimX && colMatches(width - 1 - right, top, height - bottom)) {
    right++;
  }

  if (top === 0 && bottom === 0 && left === 0 && right === 0) {
    return { rgba, width, height, trimmed: false };
  }

  const newWidth = width - left - right;
  const newHeight = height - top - bottom;
  const newRgba = new Uint8Array(newWidth * newHeight * 4);

  for (let y = 0; y < newHeight; y++) {
    const srcRowStart = ((y + top) * width + left) * 4;
    const dstRowStart = y * newWidth * 4;
    newRgba.set(rgba.subarray(srcRowStart, srcRowStart + newWidth * 4), dstRowStart);
  }

  return { rgba: newRgba, width: newWidth, height: newHeight, trimmed: true };
}
