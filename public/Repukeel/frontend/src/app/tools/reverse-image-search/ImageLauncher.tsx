'use client';

import React, { useState, useId, useRef, useEffect } from 'react';
import {
  normalizeImageUrl,
  warnIfNotDirectImage,
  getEngineVerifications,
  validateImageFile,
  UPLOAD_ENGINES,
} from '@/lib/reverseImage';

export default function ImageLauncher() {
  const [activeTab, setActiveTab] = useState<'link' | 'upload'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#upload') {
      return 'upload';
    }
    return 'link';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#upload') {
        setActiveTab('upload');
      } else if (window.location.hash === '#link') {
        setActiveTab('link');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // --- Link Mode State ---
  const [inputUrl, setInputUrl] = useState('');
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);

  // --- Upload Mode State ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Hidden form and file input refs for upload mode
  const filePickerRef = useRef<HTMLInputElement>(null);
  const lensFormRef = useRef<HTMLFormElement>(null);
  const lensInputRef = useRef<HTMLInputElement>(null);
  const yandexFormRef = useRef<HTMLFormElement>(null);
  const yandexInputRef = useRef<HTMLInputElement>(null);

  const inputId = useId();
  const helpId = `${inputId}-help`;
  const errorId = `${inputId}-error`;
  const warnId = `${inputId}-warn`;
  const fileDropId = `${inputId}-file-drop`;
  const fileErrorId = `${inputId}-file-error`;

  const trimmed = inputUrl.trim();
  const normResult = trimmed ? normalizeImageUrl(trimmed) : null;
  const isValid = normResult?.valid ?? false;
  const validUrl = isValid && normResult?.url ? normResult.url : '';
  const warning = isValid && !warningDismissed ? warnIfNotDirectImage(validUrl) : null;
  const engineMap = isValid ? getEngineVerifications(validUrl) : null;

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
    setWarningDismissed(false);
    setShowPreview(false);
    setPreviewError(false);
    setPopupBlocked(false);
  };

  const handleClearUrl = () => {
    setInputUrl('');
    setWarningDismissed(false);
    setShowPreview(false);
    setPreviewError(false);
    setPopupBlocked(false);
  };

  const handleOpenAllFour = () => {
    if (!engineMap) return;
    setPopupBlocked(false);

    const enginesToOpen = [
      engineMap.google.works ? engineMap.google.url : engineMap.google.uploadPageUrl,
      engineMap.bing.works ? engineMap.bing.url : engineMap.bing.uploadPageUrl,
      engineMap.yandex.works ? engineMap.yandex.url : engineMap.yandex.uploadPageUrl,
      engineMap.tineye.works ? engineMap.tineye.url : engineMap.tineye.uploadPageUrl,
    ];

    let blocked = false;
    enginesToOpen.forEach((targetUrl) => {
      try {
        const openedWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
        if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
          blocked = true;
        }
      } catch {
        blocked = true;
      }
    });

    if (blocked) {
      setPopupBlocked(true);
    }
  };

  // --- File Upload Handlers ---
  const handleProcessFile = (file: File | null | undefined) => {
    setFileError(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl(null);
    }

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setSelectedFile(null);
      setFileError(validation.error || 'Invalid file.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setFilePreviewUrl(objectUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleProcessFile(file);
    // Reset file input value so selecting the same file triggers change
    e.target.value = '';
  };

  const handleClearFile = () => {
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl(null);
    }
    setSelectedFile(null);
    setFileError(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleProcessFile(file);
  };

  const handleLaunchUploadGoogle = () => {
    if (!selectedFile || !lensInputRef.current || !lensFormRef.current) return;
    try {
      const dt = new DataTransfer();
      dt.items.add(selectedFile);
      lensInputRef.current.files = dt.files;
      lensFormRef.current.submit();
    } catch {
      window.open(UPLOAD_ENGINES.google.uploadPageUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLaunchUploadYandex = () => {
    if (!selectedFile || !yandexInputRef.current || !yandexFormRef.current) return;
    try {
      const dt = new DataTransfer();
      dt.items.add(selectedFile);
      yandexInputRef.current.files = dt.files;
      yandexFormRef.current.submit();
    } catch {
      window.open(UPLOAD_ENGINES.yandex.uploadPageUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Hidden browser forms for device upload mode */}
      <form
        ref={lensFormRef}
        method={UPLOAD_ENGINES.google.method}
        action={UPLOAD_ENGINES.google.actionUrl}
        encType="multipart/form-data"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
        aria-hidden="true"
      >
        <input ref={lensInputRef} type="file" name={UPLOAD_ENGINES.google.fieldName} />
      </form>

      <form
        ref={yandexFormRef}
        method={UPLOAD_ENGINES.yandex.method}
        action={UPLOAD_ENGINES.yandex.actionUrl}
        encType="multipart/form-data"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
        aria-hidden="true"
      >
        <input ref={yandexInputRef} type="file" name={UPLOAD_ENGINES.yandex.fieldName} />
      </form>

      {/* Mode Tabs */}
      <div className="flex border-b border-gray-200" role="tablist" aria-label="Search Mode">
        <button
          type="button"
          role="tab"
          id="tab-link"
          aria-selected={activeTab === 'link'}
          aria-controls="panel-link"
          onClick={() => setActiveTab('link')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'link'
              ? 'border-[#0c1940] text-[#0c1940]'
              : 'border-transparent text-gray-500 hover:text-[#0c1940]'
          }`}
        >
          Image link
        </button>
        <button
          type="button"
          role="tab"
          id="tab-upload"
          aria-selected={activeTab === 'upload'}
          aria-controls="panel-upload"
          onClick={() => setActiveTab('upload')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'upload'
              ? 'border-[#0c1940] text-[#0c1940]'
              : 'border-transparent text-gray-500 hover:text-[#0c1940]'
          }`}
        >
          Upload from device
        </button>
      </div>

      {/* Tab 1: Image Link Mode */}
      {activeTab === 'link' && (
        <div id="panel-link" role="tabpanel" aria-labelledby="tab-link" className="space-y-8">
          {/* Input Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor={inputId} className="block text-sm font-bold text-[#0a192f]">
                Image URL
              </label>
              {trimmed && (
                <button
                  type="button"
                  onClick={handleClearUrl}
                  className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="relative">
              <input
                id={inputId}
                type="url"
                value={inputUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/photo.jpg"
                aria-describedby={`${helpId} ${errorId} ${warnId}`}
                className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  normResult && !normResult.valid
                    ? 'border-red-300 focus:ring-red-400 bg-red-50/20'
                    : 'border-gray-300 focus:border-[#0c1940] focus:ring-[#0c1940]/20'
                }`}
              />
            </div>

            {/* Live Validation & Help Messages */}
            <div className="space-y-2">
              {!trimmed && (
                <p id={helpId} className="text-xs text-gray-500">
                  Paste a public image link starting with http:// or https://
                </p>
              )}

              {normResult && !normResult.valid && normResult.error && (
                <p id={errorId} className="text-xs font-semibold text-red-600 flex items-center gap-1.5" role="alert">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{normResult.error}</span>
                </p>
              )}

              {warning && (
                <div
                  id={warnId}
                  className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  role="status"
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-amber-700 shrink-0">Note:</span>
                    <span>{warning}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWarningDismissed(true)}
                    className="text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-2 shrink-0 self-start sm:self-center"
                  >
                    Dismiss &amp; proceed
                  </button>
                </div>
              )}

              <p className="text-[11px] text-gray-400">
                No image links are sent to RepuKeel. Search opens directly in each engine.
              </p>
            </div>
          </div>

          {/* Action Buttons: 4 Engines */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0a192f]">Search Engines</h2>
              <span className="text-xs text-gray-500">
                {isValid ? 'Ready to open' : 'Enter a valid URL above'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Google Lens */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-[#0a192f] flex items-center justify-between">
                    <span>Google Lens</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Direct URL
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Searches Google Lens directly using your image link.
                  </p>
                </div>
                {isValid && engineMap ? (
                  <a
                    href={engineMap.google.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg bg-[#0c1940] text-white text-xs font-semibold hover:bg-[#122353] transition-colors"
                  >
                    <span>Open Google Lens</span>
                    <span>&rarr;</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-400 text-xs font-semibold cursor-not-allowed"
                  >
                    Open Google Lens
                  </button>
                )}
              </div>

              {/* Bing Visual Search */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-[#0a192f] flex items-center justify-between">
                    <span>Bing Visual Search</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Direct URL
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Launches Microsoft Bing Visual Search directly.
                  </p>
                </div>
                {isValid && engineMap ? (
                  <a
                    href={engineMap.bing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg bg-[#0c1940] text-white text-xs font-semibold hover:bg-[#122353] transition-colors"
                  >
                    <span>Open Bing Visual Search</span>
                    <span>&rarr;</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-400 text-xs font-semibold cursor-not-allowed"
                  >
                    Open Bing Visual Search
                  </button>
                )}
              </div>

              {/* Yandex Images */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-[#0a192f] flex items-center justify-between">
                    <span>Yandex Images</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Direct URL
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Searches Yandex image view matching across global sites.
                  </p>
                </div>
                {isValid && engineMap ? (
                  <a
                    href={engineMap.yandex.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg bg-[#0c1940] text-white text-xs font-semibold hover:bg-[#122353] transition-colors"
                  >
                    <span>Open Yandex Images</span>
                    <span>&rarr;</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-400 text-xs font-semibold cursor-not-allowed"
                  >
                    Open Yandex Images
                  </button>
                )}
              </div>

              {/* TinEye */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 flex flex-col justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-[#0a192f] flex items-center justify-between">
                    <span>TinEye</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      Upload / Paste
                    </span>
                  </div>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    Direct URL search is currently unavailable for this engine; use its upload option instead.
                  </p>
                </div>
                {isValid && engineMap ? (
                  <a
                    href={engineMap.tineye.uploadPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition-colors"
                  >
                    <span>Open TinEye (Upload)</span>
                    <span>&rarr;</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-400 text-xs font-semibold cursor-not-allowed"
                  >
                    Open TinEye (Upload)
                  </button>
                )}
              </div>
            </div>

            {/* Open all four button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!isValid}
                onClick={handleOpenAllFour}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
                  isValid
                    ? 'bg-[#0c1940] text-[#d4af37] hover:bg-[#122353] cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Open All Four Engines</span>
              </button>

              {popupBlocked && (
                <p className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2.5 mt-2.5 text-center" role="status">
                  Your browser blocked some tabs. Use the individual buttons instead.
                </p>
              )}
            </div>
          </div>

          {/* Optional Preview Section */}
          {isValid && (
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">Preview</span>
                <button
                  type="button"
                  onClick={() => {
                    setShowPreview(!showPreview);
                    setPreviewError(false);
                  }}
                  className="text-xs font-semibold text-[#0c1940] hover:text-[#d4af37] underline underline-offset-2 transition-colors"
                >
                  {showPreview ? 'Hide preview' : 'Show preview'}
                </button>
              </div>

              {showPreview && (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center">
                  {previewError ? (
                    <p className="text-xs text-gray-500 text-center py-4">
                      Preview unavailable (the hosting site may block direct embeds). The search buttons above will still work.
                    </p>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={validUrl}
                      alt="Preview of the image to search"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => setPreviewError(true)}
                      className="max-h-64 max-w-full rounded-lg object-contain shadow-sm border border-gray-200"
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Upload from Device Mode */}
      {activeTab === 'upload' && (
        <div id="panel-upload" role="tabpanel" aria-labelledby="tab-upload" className="space-y-8">
          {/* Drag and Drop Zone */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="file-input-button" className="block text-sm font-bold text-[#0a192f]">
                Select Image File
              </label>
              {selectedFile && (
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors"
                >
                  Clear file
                </button>
              )}
            </div>

            <input
              ref={filePickerRef}
              id="file-input-hidden"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="sr-only"
              aria-describedby={`${fileDropId} ${fileErrorId}`}
            />

            <div
              id={fileDropId}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
                isDragging
                  ? 'border-[#0c1940] bg-blue-50/40'
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
              }`}
            >
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#0c1940]/5 text-[#0c1940] flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-700">
                    Drag and drop your image here, or{' '}
                    <button
                      type="button"
                      id="file-input-button"
                      onClick={() => filePickerRef.current?.click()}
                      className="text-[#0c1940] hover:text-[#d4af37] underline underline-offset-2 font-bold focus:outline-none focus:ring-2 focus:ring-[#0c1940] rounded"
                    >
                      Choose file
                    </button>
                  </p>
                  <p className="text-xs text-gray-500">
                    Max file size: 10 MB. Supported formats: JPG, PNG, WebP, GIF.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {fileError && (
              <p id={fileErrorId} className="text-xs font-semibold text-red-600 flex items-center gap-1.5" role="alert">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{fileError}</span>
              </p>
            )}

            {/* Selected File Details & Preview */}
            {selectedFile && filePreviewUrl && (
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={filePreviewUrl}
                    alt="Preview of chosen image"
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0a192f] truncate">{selectedFile.name}</p>
                    <p className="text-[11px] text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClearFile}
                  className="text-xs text-gray-500 hover:text-red-600 font-semibold shrink-0 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Consent & Safety Notices */}
          <div className="space-y-2 p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950">
            <p className="font-semibold">
              Your file is sent from your browser directly to the search engine you choose. RepuKeel does not receive or store it.
            </p>
            <p className="text-blue-800 text-[11px]">
              For your own images and content. Don&apos;t use this tool to identify or track people.
            </p>
          </div>

          {/* Search Engine Upload Buttons */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0a192f]">Search Engines</h2>
              <span className="text-xs text-gray-500">
                {selectedFile ? 'Ready to search' : 'Select a file to search'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Google Lens */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-[#0a192f] flex items-center justify-between">
                    <span>Google Lens</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Browser Submit
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sends your file directly to Google Lens from your browser.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!selectedFile}
                  onClick={handleLaunchUploadGoogle}
                  className={`inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    selectedFile
                      ? 'bg-[#0c1940] text-white hover:bg-[#122353] cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>Search with Google Lens</span>
                  <span>&rarr;</span>
                </button>
              </div>

              {/* Yandex Images */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-[#0a192f] flex items-center justify-between">
                    <span>Yandex Images</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Browser Submit
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sends your file directly to Yandex visual match search.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!selectedFile}
                  onClick={handleLaunchUploadYandex}
                  className={`inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    selectedFile
                      ? 'bg-[#0c1940] text-white hover:bg-[#122353] cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>Search with Yandex Images</span>
                  <span>&rarr;</span>
                </button>
              </div>

              {/* Bing Visual Search */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 flex flex-col justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-[#0a192f] flex items-center justify-between">
                    <span>Bing Visual Search</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      Direct Page
                    </span>
                  </div>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    Direct browser submission is not accepted by this engine. Open the upload page, then drag your file onto it.
                  </p>
                </div>
                <a
                  href={UPLOAD_ENGINES.bing.uploadPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition-colors"
                >
                  <span>Open Bing Upload Page</span>
                  <span>&rarr;</span>
                </a>
              </div>

              {/* TinEye */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 flex flex-col justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-[#0a192f] flex items-center justify-between">
                    <span>TinEye</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      Direct Page
                    </span>
                  </div>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    Direct browser submission is not accepted by this engine. Open the upload page, then drag your file onto it.
                  </p>
                </div>
                <a
                  href={UPLOAD_ENGINES.tineye.uploadPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition-colors"
                >
                  <span>Open TinEye Upload Page</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
