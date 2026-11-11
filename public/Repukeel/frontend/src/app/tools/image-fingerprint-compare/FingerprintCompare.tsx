'use client';

import { useState, useRef, useEffect, useId, useCallback } from 'react';
import {
  toGray32,
  trimPlainBorders,
  compareGray32,
  bestMatch,
  ComparisonResult,
} from '@/lib/imageFingerprint';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_MEGAPIXELS = 25_000_000;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

interface ImageSlotState {
  file: File | null;
  previewUrl: string | null;
  error: string | null;
  gray32: Uint8Array | null;
  rawRgba: Uint8ClampedArray | null;
  width: number;
  height: number;
}

export default function FingerprintCompare() {
  const componentId = useId();

  // Slot states
  const [slotA, setSlotA] = useState<ImageSlotState>({
    file: null,
    previewUrl: null,
    error: null,
    gray32: null,
    rawRgba: null,
    width: 0,
    height: 0,
  });

  const [slotB, setSlotB] = useState<ImageSlotState>({
    file: null,
    previewUrl: null,
    error: null,
    gray32: null,
    rawRgba: null,
    width: 0,
    height: 0,
  });

  // Toggles
  const [checkTransforms, setCheckTransforms] = useState(true);
  const [ignoreBorders, setIgnoreBorders] = useState(false);

  // Comparison Result
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Drag states
  const [isDraggingA, setIsDraggingA] = useState(false);
  const [isDraggingB, setIsDraggingB] = useState(false);

  const fileInputRefA = useRef<HTMLInputElement>(null);
  const fileInputRefB = useRef<HTMLInputElement>(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (slotA.previewUrl) URL.revokeObjectURL(slotA.previewUrl);
      if (slotB.previewUrl) URL.revokeObjectURL(slotB.previewUrl);
    };
  }, [slotA.previewUrl, slotB.previewUrl]);

  // Decode file to RGBA and 32x32 grayscale
  const decodeFile = async (
    file: File
  ): Promise<{ rgba: Uint8ClampedArray; width: number; height: number; gray32: Uint8Array }> => {
    // 1. Try createImageBitmap with imageOrientation
    if (typeof createImageBitmap !== 'undefined') {
      try {
        const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        if (bitmap.width * bitmap.height > MAX_MEGAPIXELS) {
          bitmap.close();
          throw new Error('Image exceeds 25 megapixels limit. Please select a smaller image.');
        }

        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          bitmap.close();
          throw new Error('Canvas context not available.');
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const gray32 = toGray32(imgData.data, canvas.width, canvas.height);
        return { rgba: imgData.data, width: canvas.width, height: canvas.height, gray32 };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '';
        if (message.includes('25 megapixels')) throw err;
        // Fall back to Image constructor if createImageBitmap fails
      }
    }

    // 2. Image fallback
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        URL.revokeObjectURL(url);
        if (img.naturalWidth * img.naturalHeight > MAX_MEGAPIXELS) {
          reject(new Error('Image exceeds 25 megapixels limit. Please select a smaller image.'));
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available.'));
          return;
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const gray32 = toGray32(imgData.data, canvas.width, canvas.height);
        resolve({ rgba: imgData.data, width: canvas.width, height: canvas.height, gray32 });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Could not read this image.'));
      };

      img.src = url;
    });
  };

  const validateFile = (file: File): string | null => {
    const ext = file.name.toLowerCase().split('.').pop();
    if (ext === 'heic' || ext === 'heif') {
      return "This format isn't supported. Export as JPG or PNG.";
    }
    if (ext === 'pdf' || file.type === 'application/pdf') {
      return 'PDF files are not supported. Please select a JPG, PNG, WebP, or GIF image.';
    }
    if (ext === 'svg' || file.type === 'image/svg+xml') {
      return 'SVG vector files are not supported. Please select a JPG, PNG, WebP, or GIF image.';
    }
    if (file.size === 0) {
      return 'The selected file is empty (0 bytes).';
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return 'File exceeds 10 MB limit. Please select an image under 10 MB.';
    }
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return 'Unsupported format. Please select a JPG, PNG, WebP, or GIF image.';
    }
    return null;
  };

  const handleFileSelect = async (file: File | undefined, slot: 'A' | 'B') => {
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      if (slot === 'A') {
        if (slotA.previewUrl) URL.revokeObjectURL(slotA.previewUrl);
        setSlotA({ file: null, previewUrl: null, error: validationError, gray32: null, rawRgba: null, width: 0, height: 0 });
      } else {
        if (slotB.previewUrl) URL.revokeObjectURL(slotB.previewUrl);
        setSlotB({ file: null, previewUrl: null, error: validationError, gray32: null, rawRgba: null, width: 0, height: 0 });
      }
      return;
    }

    setIsProcessing(true);
    try {
      const decoded = await decodeFile(file);
      const previewUrl = URL.createObjectURL(file);

      if (slot === 'A') {
        if (slotA.previewUrl) URL.revokeObjectURL(slotA.previewUrl);
        setSlotA({
          file,
          previewUrl,
          error: null,
          gray32: decoded.gray32,
          rawRgba: decoded.rgba,
          width: decoded.width,
          height: decoded.height,
        });
      } else {
        if (slotB.previewUrl) URL.revokeObjectURL(slotB.previewUrl);
        setSlotB({
          file,
          previewUrl,
          error: null,
          gray32: decoded.gray32,
          rawRgba: decoded.rgba,
          width: decoded.width,
          height: decoded.height,
        });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Could not read this image.';
      if (slot === 'A') {
        if (slotA.previewUrl) URL.revokeObjectURL(slotA.previewUrl);
        setSlotA({ file: null, previewUrl: null, error: errorMsg, gray32: null, rawRgba: null, width: 0, height: 0 });
      } else {
        if (slotB.previewUrl) URL.revokeObjectURL(slotB.previewUrl);
        setSlotB({ file: null, previewUrl: null, error: errorMsg, gray32: null, rawRgba: null, width: 0, height: 0 });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Run comparison whenever slots or toggles change
  const runComparison = useCallback(() => {
    if (!slotA.rawRgba || !slotB.rawRgba) {
      setResult(null);
      return;
    }

    let grayA = slotA.gray32!;
    let grayB = slotB.gray32!;

    if (ignoreBorders) {
      const trimmedA = trimPlainBorders(slotA.rawRgba, slotA.width, slotA.height);
      const trimmedB = trimPlainBorders(slotB.rawRgba, slotB.width, slotB.height);
      grayA = toGray32(trimmedA.rgba, trimmedA.width, trimmedA.height);
      grayB = toGray32(trimmedB.rgba, trimmedB.width, trimmedB.height);
    }

    if (checkTransforms) {
      const best = bestMatch(grayA, grayB);
      setResult(best);
    } else {
      const direct = compareGray32(grayA, grayB, 'as-is');
      setResult(direct);
    }
  }, [slotA.rawRgba, slotA.gray32, slotA.width, slotA.height, slotB.rawRgba, slotB.gray32, slotB.width, slotB.height, checkTransforms, ignoreBorders]);

  // Derived-state pattern: recalculate whenever inputs or options change.
  // setResult is called inside the effect intentionally — this IS the
  // calculation, with no external subscription involved.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    runComparison();
  }, [runComparison]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleCopyResult = async () => {
    if (!result) return;
    const now = new Date().toISOString().split('T')[0];
    const lines = [
      `RepuKeel Image Fingerprint Comparison (${now})`,
      `Combined Similarity Score: ${result.score}% (${result.verdict})`,
      result.transform !== 'as-is' ? `Best match orientation: ${result.transform}` : '',
      `aHash (Average): Distance ${result.aHash.distance}/64 (${result.aHash.similarity}%)`,
      `  Image 1: ${result.aHash.hexA}`,
      `  Image 2: ${result.aHash.hexB}`,
      `dHash (Difference): Distance ${result.dHash.distance}/64 (${result.dHash.similarity}%)`,
      `  Image 1: ${result.dHash.hexA}`,
      `  Image 2: ${result.dHash.hexB}`,
      `pHash (Perceptual DCT): Distance ${result.pHash.distance}/64 (${result.pHash.similarity}%)`,
      `  Image 1: ${result.pHash.hexA}`,
      `  Image 2: ${result.pHash.hexB}`,
      '',
      'Limits Note: Similarity is a hint, not proof. This tool does not provide legal advice.',
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const getVerdictBadgeStyle = (verdictText: string) => {
    switch (verdictText) {
      case 'Very high similarity':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'High similarity':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'Some similarity':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Upload Dual Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slot A: Original image */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`${componentId}-input-a`}
              className="block text-sm font-bold text-[#0a192f]"
            >
              Original image
            </label>
            {slotA.file && (
              <button
                type="button"
                onClick={() => {
                  if (slotA.previewUrl) URL.revokeObjectURL(slotA.previewUrl);
                  setSlotA({ file: null, previewUrl: null, error: null, gray32: null, rawRgba: null, width: 0, height: 0 });
                }}
                className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <input
            ref={fileInputRefA}
            id={`${componentId}-input-a`}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => {
              handleFileSelect(e.target.files?.[0], 'A');
              e.target.value = '';
            }}
            className="sr-only"
            aria-describedby={`${componentId}-help-a ${componentId}-error-a`}
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingA(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingA(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingA(false);
              handleFileSelect(e.dataTransfer.files?.[0], 'A');
            }}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all min-h-[160px] flex flex-col items-center justify-center ${
              isDraggingA
                ? 'border-[#0c1940] bg-blue-50/40'
                : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
            }`}
          >
            {slotA.previewUrl ? (
              <div className="flex flex-col items-center space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slotA.previewUrl}
                  alt="Original image preview"
                  className="max-h-36 max-w-full rounded-lg object-contain shadow-sm border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => fileInputRefA.current?.click()}
                  className="text-xs text-[#0c1940] hover:text-[#d4af37] underline font-semibold focus:outline-none focus:ring-2 focus:ring-[#0c1940] rounded px-2 py-1"
                >
                  Change file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">
                  Drag and drop, or{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRefA.current?.click()}
                    className="text-[#0c1940] hover:text-[#d4af37] underline font-bold focus:outline-none focus:ring-2 focus:ring-[#0c1940] rounded px-1"
                  >
                    Choose file
                  </button>
                </p>
                <p id={`${componentId}-help-a`} className="text-xs text-gray-500">
                  JPG, PNG, WebP, GIF (max 10 MB, 25 MP)
                </p>
              </div>
            )}
          </div>

          {slotA.error && (
            <p
              id={`${componentId}-error-a`}
              className="text-xs font-semibold text-red-600 flex items-center gap-1.5"
              role="alert"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{slotA.error}</span>
            </p>
          )}
        </div>

        {/* Slot B: Image to compare */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`${componentId}-input-b`}
              className="block text-sm font-bold text-[#0a192f]"
            >
              Image to compare
            </label>
            {slotB.file && (
              <button
                type="button"
                onClick={() => {
                  if (slotB.previewUrl) URL.revokeObjectURL(slotB.previewUrl);
                  setSlotB({ file: null, previewUrl: null, error: null, gray32: null, rawRgba: null, width: 0, height: 0 });
                }}
                className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <input
            ref={fileInputRefB}
            id={`${componentId}-input-b`}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => {
              handleFileSelect(e.target.files?.[0], 'B');
              e.target.value = '';
            }}
            className="sr-only"
            aria-describedby={`${componentId}-help-b ${componentId}-error-b`}
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingB(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingB(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingB(false);
              handleFileSelect(e.dataTransfer.files?.[0], 'B');
            }}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all min-h-[160px] flex flex-col items-center justify-center ${
              isDraggingB
                ? 'border-[#0c1940] bg-blue-50/40'
                : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
            }`}
          >
            {slotB.previewUrl ? (
              <div className="flex flex-col items-center space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slotB.previewUrl}
                  alt="Comparison image preview"
                  className="max-h-36 max-w-full rounded-lg object-contain shadow-sm border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => fileInputRefB.current?.click()}
                  className="text-xs text-[#0c1940] hover:text-[#d4af37] underline font-semibold focus:outline-none focus:ring-2 focus:ring-[#0c1940] rounded px-2 py-1"
                >
                  Change file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">
                  Drag and drop, or{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRefB.current?.click()}
                    className="text-[#0c1940] hover:text-[#d4af37] underline font-bold focus:outline-none focus:ring-2 focus:ring-[#0c1940] rounded px-1"
                  >
                    Choose file
                  </button>
                </p>
                <p id={`${componentId}-help-b`} className="text-xs text-gray-500">
                  JPG, PNG, WebP, GIF (max 10 MB, 25 MP)
                </p>
              </div>
            )}
          </div>

          {slotB.error && (
            <p
              id={`${componentId}-error-b`}
              className="text-xs font-semibold text-red-600 flex items-center gap-1.5"
              role="alert"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{slotB.error}</span>
            </p>
          )}
        </div>
      </div>

      {/* Toggles */}
      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label htmlFor={`${componentId}-toggle-transforms`} className="text-sm font-bold text-[#0a192f] block cursor-pointer">
              Check flipped and rotated versions
            </label>
            <p className="text-xs text-gray-500">
              Compares against 90°, 180°, 270° rotations and mirrored orientations.
            </p>
          </div>
          <input
            id={`${componentId}-toggle-transforms`}
            type="checkbox"
            checked={checkTransforms}
            onChange={(e) => setCheckTransforms(e.target.checked)}
            className="w-5 h-5 text-[#0c1940] rounded border-gray-300 focus:ring-[#0c1940] cursor-pointer"
          />
        </div>

        <div className="pt-3 border-t border-gray-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label htmlFor={`${componentId}-toggle-borders`} className="text-sm font-bold text-[#0a192f] block cursor-pointer">
              Ignore plain borders
            </label>
            <p className="text-xs text-gray-500">
              Trims uniform solid borders (e.g. screenshot margins) up to 25% before comparison.
            </p>
          </div>
          <input
            id={`${componentId}-toggle-borders`}
            type="checkbox"
            checked={ignoreBorders}
            onChange={(e) => setIgnoreBorders(e.target.checked)}
            className="w-5 h-5 text-[#0c1940] rounded border-gray-300 focus:ring-[#0c1940] cursor-pointer"
          />
        </div>
      </div>

      {/* Privacy & Safety Notices */}
      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950 space-y-1">
        <p className="font-semibold">
          RepuKeel does not receive or store your images. All processing executes locally in your browser.
        </p>
        <p className="text-blue-800 text-[11px]">
          For your own images and content. Don&apos;t use this tool to identify or track people.
        </p>
      </div>

      {/* Results Region */}
      <div aria-live="polite" className="space-y-6 pt-2 border-t border-gray-100">
        {isProcessing && (
          <div className="p-8 text-center text-gray-500 text-sm font-medium">
            Processing image pixels...
          </div>
        )}

        {!isProcessing && !result && (
          <div className="p-8 text-center text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            Select both images above to calculate perceptual similarity.
          </div>
        )}

        {!isProcessing && result && (
          <div className="space-y-6">
            {/* Score Banner */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-[#0a192f] tracking-tight">
                    {result.score}%
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full border ${getVerdictBadgeStyle(
                      result.verdict
                    )}`}
                  >
                    {result.verdict}
                  </span>
                </div>

                <p className="text-xs text-gray-600">
                  {result.transform !== 'as-is'
                    ? `Best match found using ${result.transform} orientation.`
                    : 'Best match found in standard (as-is) orientation.'}
                </p>
              </div>

              {/* Progress Meter Bar */}
              <div className="w-full md:max-w-xs space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>Similarity Meter</span>
                  <span>{result.score}%</span>
                </div>
                <div
                  role="meter"
                  aria-label="Image Similarity"
                  aria-valuenow={result.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="w-full h-3 rounded-full bg-gray-200 overflow-hidden"
                >
                  <div
                    className="h-full bg-[#0c1940] transition-all duration-500 rounded-full"
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Hash Details Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-[#0c1940] text-white">
                  <tr>
                    <th className="py-3 px-4 font-bold">Algorithm</th>
                    <th className="py-3 px-4 font-bold">Image 1 Hash</th>
                    <th className="py-3 px-4 font-bold">Image 2 Hash</th>
                    <th className="py-3 px-4 font-bold text-center">Hamming Dist</th>
                    <th className="py-3 px-4 font-bold text-right">Similarity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[#0a192f]">
                      aHash <span className="font-normal text-gray-500">(Average)</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600">{result.aHash.hexA}</td>
                    <td className="py-3 px-4 font-mono text-gray-600">{result.aHash.hexB}</td>
                    <td className="py-3 px-4 text-center font-bold text-gray-800">
                      {result.aHash.distance} / 64
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#0c1940]">
                      {result.aHash.similarity}%
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-semibold text-[#0a192f]">
                      dHash <span className="font-normal text-gray-500">(Difference)</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600">{result.dHash.hexA}</td>
                    <td className="py-3 px-4 font-mono text-gray-600">{result.dHash.hexB}</td>
                    <td className="py-3 px-4 text-center font-bold text-gray-800">
                      {result.dHash.distance} / 64
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#0c1940]">
                      {result.dHash.similarity}%
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-semibold text-[#0a192f]">
                      pHash <span className="font-normal text-gray-500">(Perceptual DCT)</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600">{result.pHash.hexA}</td>
                    <td className="py-3 px-4 font-mono text-gray-600">{result.pHash.hexB}</td>
                    <td className="py-3 px-4 text-center font-bold text-gray-800">
                      {result.pHash.distance} / 64
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#0c1940]">
                      {result.pHash.similarity}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Copy Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handleCopyResult}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c1940] text-white text-xs font-semibold hover:bg-[#122353] transition-colors shadow-sm w-full sm:w-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Result Summary'}</span>
              </button>

              <p className="text-[11px] text-gray-500 text-center sm:text-right">
                Summary excludes filenames to protect your privacy.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
