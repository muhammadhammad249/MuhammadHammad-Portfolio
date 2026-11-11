import test from 'node:test';
import assert from 'node:assert/strict';
import {
  aHash,
  dHash,
  pHash,
  hammingDistance,
  similarity,
  verdict,
  combinedScore,
  bestMatch,
  transformGray32,
  toGray32,
  trimPlainBorders,
} from '../src/lib/imageFingerprint.ts';

test('1. Identical arrays give distance 0 and similarity 100 for all three hashes', () => {
  const arr = new Uint8Array(1024);
  for (let i = 0; i < 1024; i++) {
    arr[i] = (i * 7 + 13) % 256;
  }

  const hA = aHash(arr);
  const hD = dHash(arr);
  const hP = pHash(arr);

  assert.equal(hammingDistance(hA, hA), 0);
  assert.equal(hammingDistance(hD, hD), 0);
  assert.equal(hammingDistance(hP, hP), 0);

  assert.equal(similarity(0), 100);
  assert.equal(combinedScore(arr, arr), 100);
});

test('2. Hamming distance exact bit difference checks', () => {
  assert.equal(hammingDistance('0000000000000000', 'ffffffffffffffff'), 64);
  assert.equal(hammingDistance('0000000000000000', '0000000000000001'), 1);
  assert.equal(hammingDistance('0000000000000000', '000000000000000f'), 4);
  assert.equal(hammingDistance('1234567890abcdef', '1234567890abcdef'), 0);
});

test('3. Gradient array vs same gradient with +10 brightness gives similarity >= 90', () => {
  const grad = new Uint8Array(1024);
  const gradBright = new Uint8Array(1024);
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      const v = Math.floor((x / 31) * 200 + 20);
      grad[y * 32 + x] = v;
      gradBright[y * 32 + x] = Math.min(255, v + 10);
    }
  }

  const score = combinedScore(grad, gradBright);
  assert.ok(score >= 90, `Expected score >= 90, got ${score}`);
});

test('4. Gradient vs its inverse gives similarity <= 40', () => {
  const grad = new Uint8Array(1024);
  const gradInv = new Uint8Array(1024);
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      const v = Math.floor((x / 31) * 200 + 20);
      grad[y * 32 + x] = v;
      gradInv[y * 32 + x] = 255 - v;
    }
  }

  const score = combinedScore(grad, gradInv);
  assert.ok(score <= 40, `Expected score <= 40, got ${score}`);
});

test('5. Mirrored array: normal compare is lower than bestMatch, and bestMatch reports "mirrored"', () => {
  const grad = new Uint8Array(1024);
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      grad[y * 32 + x] = Math.floor((x / 31) * 240);
    }
  }

  const mirrored = transformGray32(grad, 'mirrored');
  const normalScore = combinedScore(grad, mirrored);
  const match = bestMatch(grad, mirrored);

  assert.ok(match.bestScore > normalScore, `Expected bestScore (${match.bestScore}) > normalScore (${normalScore})`);
  assert.equal(match.transform, 'mirrored');
  assert.equal(match.bestScore, 100);
});

test('6. DCT check: a constant array produces a valid hash without NaN', () => {
  const constant = new Uint8Array(1024).fill(128);
  const hash = pHash(constant);

  assert.equal(hash.length, 16);
  assert.equal(/^[0-9a-f]{16}$/i.test(hash), true);
  assert.equal(hash.includes('NaN'), false);
});

test('7. trimPlainBorders trims 10px white border, leaves borderless image unchanged, never trims > 25%', () => {
  const synthW = 100;
  const synthH = 100;

  // 1. Synthetic image with 10px white border around 80x80 colored center
  const borderedRgba = new Uint8Array(synthW * synthH * 4);
  for (let y = 0; y < synthH; y++) {
    for (let x = 0; x < synthW; x++) {
      const idx = (y * synthW + x) * 4;
      if (x < 10 || x >= 90 || y < 10 || y >= 90) {
        borderedRgba[idx] = 255;
        borderedRgba[idx + 1] = 255;
        borderedRgba[idx + 2] = 255;
        borderedRgba[idx + 3] = 255;
      } else {
        borderedRgba[idx] = 40;
        borderedRgba[idx + 1] = 80;
        borderedRgba[idx + 2] = 120;
        borderedRgba[idx + 3] = 255;
      }
    }
  }

  const resBorder = trimPlainBorders(borderedRgba, synthW, synthH);
  assert.equal(resBorder.trimmed, true);
  assert.equal(resBorder.width, 80);
  assert.equal(resBorder.height, 80);

  // 2. Borderless image (full varied content)
  const borderlessRgba = new Uint8Array(synthW * synthH * 4);
  for (let y = 0; y < synthH; y++) {
    for (let x = 0; x < synthW; x++) {
      const idx = (y * synthW + x) * 4;
      borderlessRgba[idx] = (x * 3) % 256;
      borderlessRgba[idx + 1] = (y * 3) % 256;
      borderlessRgba[idx + 2] = 100;
      borderlessRgba[idx + 3] = 255;
    }
  }
  const resBorderless = trimPlainBorders(borderlessRgba, synthW, synthH);
  assert.equal(resBorderless.trimmed, false);
  assert.equal(resBorderless.width, 100);
  assert.equal(resBorderless.height, 100);

  // 3. Image with wide 40px border on 100x100: must not trim over 25% (25px max per side -> 50x50 remaining)
  const wideBorderRgba = new Uint8Array(synthW * synthH * 4);
  for (let y = 0; y < synthH; y++) {
    for (let x = 0; x < synthW; x++) {
      const idx = (y * synthW + x) * 4;
      if (x < 40 || x >= 60 || y < 40 || y >= 60) {
        wideBorderRgba[idx] = 255;
        wideBorderRgba[idx + 1] = 255;
        wideBorderRgba[idx + 2] = 255;
        wideBorderRgba[idx + 3] = 255;
      } else {
        wideBorderRgba[idx] = 10;
        wideBorderRgba[idx + 1] = 20;
        wideBorderRgba[idx + 2] = 30;
        wideBorderRgba[idx + 3] = 255;
      }
    }
  }
  const resWide = trimPlainBorders(wideBorderRgba, synthW, synthH);
  assert.equal(resWide.trimmed, true);
  assert.equal(resWide.width, 50);
  assert.equal(resWide.height, 50);
});

test('8. Verdict boundaries at 59, 60, 74, 75, 89, 90', () => {
  assert.equal(verdict(59), 'Low similarity');
  assert.equal(verdict(60), 'Some similarity');
  assert.equal(verdict(74), 'Some similarity');
  assert.equal(verdict(75), 'High similarity');
  assert.equal(verdict(89), 'High similarity');
  assert.equal(verdict(90), 'Very high similarity');
  assert.equal(verdict(100), 'Very high similarity');
  assert.equal(verdict(0), 'Low similarity');
});

test('9. toGray32 compositing transparency onto white and area downscaling', () => {
  // Fully transparent 64x64 image
  const transRgba = new Uint8Array(64 * 64 * 4); // all 0, alpha 0
  const gray = toGray32(transRgba, 64, 64);
  assert.equal(gray.length, 1024);
  // Alpha 0 composited onto white (255) produces 255 everywhere
  assert.equal(gray[0], 255);
  assert.equal(gray[512], 255);
  assert.equal(gray[1023], 255);
});
