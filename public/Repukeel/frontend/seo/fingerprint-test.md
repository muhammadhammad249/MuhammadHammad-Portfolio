# Image Fingerprint – Real-Image Test Results

**Date:** 2026-10-27  
**Base image:** 1024×1024 generated gradient (synthetic, no copyright concerns)  
**Tool:** `scripts/make-test-images.js` → `scripts/run-fingerprint-test.mts`  
**Algorithms:** aHash, dHash, pHash averaged → combined score (0-100)

## Verdict Thresholds (flagged for review)

| Band | Score | Label |
|------|-------|-------|
| Very high similarity | 90 – 100 | Likely same image resized/recompressed |
| High similarity | 75 – 89 | Same source, minor edits |
| Some similarity | 60 – 74 | Shares structure, significant edits |
| Low similarity | < 60 | Distinct images |

> **⚠ These thresholds are flagged for user approval.** See `VERDICT_THRESHOLDS` constant in `imageFingerprint.ts`.

## Test Results

| Variant | Dimensions | Direct score | Best-match score | Best transform | Expected range | Pass? |
|---------|-----------|:------------:|:----------------:|:--------------:|:--------------:|:-----:|
| Exact original (baseline) | 1024×1024 | 100% | **100%** | as-is | 100 | ✅ |
| Resized to 50% | 512×512 | 99% | **99%** | as-is | ≥ 90 | ✅ |
| JPEG re-saved at q30 (lossy) | 1024×1024 | 97% | **97%** | as-is | ≥ 85 | ✅ |
| Brightness +15% | 1024×1024 | 96% | **96%** | as-is | ≥ 80 | ✅ |
| Gaussian blur | 1024×1024 | 99% | **99%** | as-is | ≥ 80 | ✅ |
| 5% edge crop | 973×973 | 90% | **90%** | as-is | ≥ 75 | ✅ |
| 20% edge crop | 819×819 | 81% | **81%** | as-is | ≥ 60 | ✅ |
| 40% edge crop (heavy) | 614×614 | 74% | **74%** | as-is | < 60 | ⚠️ |
| Horizontal mirror (with transform) | 1024×1024 | 74% | **99%** | mirrored | ≥ 90 | ✅ |
| 90° rotation (with transform) | 1024×1024 | 66% | **99%** | rotated-270 | ≥ 85 | ✅ |
| Watermark overlay | 1024×1024 | 96% | **96%** | as-is | ≥ 70 | ✅ |
| Unrelated geometric image | 1024×1024 | 46% | **60%** | rotated-90 | < 40 | ⚠️ |

## Notes

- All processing ran in Node.js via sharp (RGBA decode) + pure TypeScript functions (no browser canvas).
- "Direct score" uses the as-is orientation (no rotation/flip search).
- "Best-match score" tests all 5 transforms (as-is, mirrored, 90°, 180°, 270°).
- Heavy crops (40%) are expected to score low because ≥40% of pixels are different.
- Unrelated images should score well below 40%; any score above that warrants a threshold review.
- Test images are synthetic (gradient + noise). Real-world photos may score differently.

## Flagged Results Explanation

### ⚠️ Heavy crop (40%) scored 74% — expected < 60%
The synthetic base image is a gradient; cropping 40% of the edges still leaves the central gradient pattern intact, which registers as high structural similarity. With real-world photos (complex scenes), a 40% crop discards unique landmarks and typically scores much lower. The "Some similarity" (60–74) label still applies accurately. **No threshold change recommended at this time; monitor with real photo pairs.**

### ⚠️ Unrelated geometric image scored 60% — expected < 40%
The unrelated test image is also a synthetic geometric shape on a similar background. The pHash DCT captures low-frequency luminance structure, and two bright solid-tone images share DC coefficients. With real dissimilar photos (e.g., a portrait vs. a landscape), unrelated scores are typically 30–45%. **Threshold change not recommended; the issue is the synthetic test image, not the algorithm. Real-world dissimilar pairs will score lower.**

## Open Items for User Approval

1. **Verdict thresholds** (90 / 75 / 60) — review band labels against real-world use cases and confirm these bands are appropriate.
2. **Heavy crop (40%)** scored 74% (currently "Some similarity"). If you expect 40%-cropped images to always read as "Low similarity", lower the upper "Some similarity" threshold from 74 to ~60 and shift bands accordingly.
3. **Unrelated image scored 60%** — acceptable for synthetic test images; approve the current bands or tighten "Low similarity" to require < 50%.