export interface NormalizeUrlResult {
  valid: boolean;
  url?: string;
  error?: string;
}

export interface EngineUrlMap {
  google: string;
  tineye: string;
  bing: string;
  yandex: string;
}

export interface EngineVerification {
  name: string;
  url: string;
  works: boolean;
  status: 'works' | 'redirects to upload page' | 'fails';
  uploadPageUrl: string;
  note?: string;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export interface UploadEngineConfig {
  name: string;
  actionUrl: string;
  method: 'POST';
  fieldName: string;
  status: 'works' | 'opens upload page but file not accepted' | 'fails';
  uploadPageUrl: string;
  fallbackText: string;
  note?: string;
}

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

/**
 * Validates an image file for browser-based upload:
 * - Allowed types: image/jpeg, image/png, image/webp, image/gif.
 * - Max size: 10 MB.
 * - Rejects empty files (0 bytes).
 * - Rejects PDF, SVG, and other unsupported file types with descriptive errors.
 */
export function validateImageFile(file: { name?: string; size: number; type: string } | null | undefined): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'Please choose or drop an image file.' };
  }

  if (file.size === 0) {
    return { valid: false, error: 'The selected file is empty (0 bytes). Please choose a valid image.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: 'File exceeds 10 MB limit. Please select an image under 10 MB.' };
  }

  const type = file.type?.toLowerCase() || '';
  if (!ALLOWED_IMAGE_TYPES.includes(type)) {
    if (type === 'application/pdf') {
      return { valid: false, error: 'PDF files are not supported. Please select a JPG, PNG, WebP, or GIF image.' };
    }
    if (type === 'image/svg+xml') {
      return { valid: false, error: 'SVG vector files are not supported. Please select a JPG, PNG, WebP, or GIF image.' };
    }
    return { valid: false, error: 'Unsupported file type. Please select a JPG, PNG, WebP, or GIF image.' };
  }

  return { valid: true };
}

export const UPLOAD_ENGINES: Record<'google' | 'bing' | 'yandex' | 'tineye', UploadEngineConfig> = {
  google: {
    name: 'Google Lens',
    actionUrl: 'https://lens.google.com/v3/upload',
    method: 'POST',
    fieldName: 'encoded_image',
    status: 'works',
    uploadPageUrl: 'https://lens.google.com/',
    fallbackText: 'Open the upload page, then drag your file onto it',
    note: 'Accepts multipart/form-data encoded_image and redirects to visual search results.',
  },
  yandex: {
    name: 'Yandex Images',
    actionUrl: 'https://yandex.com/images/search?rpt=imageview',
    method: 'POST',
    fieldName: 'upfile',
    status: 'works',
    uploadPageUrl: 'https://yandex.com/images/',
    fallbackText: 'Open the upload page, then drag your file onto it',
    note: 'Accepts multipart/form-data upfile and returns visual match results.',
  },
  bing: {
    name: 'Bing Visual Search',
    actionUrl: 'https://www.bing.com/images/search?view=detailv2&iss=sbiupload&FORM=SBIHMP',
    method: 'POST',
    fieldName: 'image',
    status: 'opens upload page but file not accepted',
    uploadPageUrl: 'https://www.bing.com/visualsearch',
    fallbackText: 'Open the upload page, then drag your file onto it',
    note: 'Bing interactive uploads rely on internal client-side JavaScript APIs; cross-origin form post lands on Bing without processing file.',
  },
  tineye: {
    name: 'TinEye',
    actionUrl: 'https://tineye.com/search',
    method: 'POST',
    fieldName: 'image',
    status: 'fails',
    uploadPageUrl: 'https://tineye.com/',
    fallbackText: 'Open the upload page, then drag your file onto it',
    note: 'TinEye blocks cross-origin form submissions with Cloudflare 403 Forbidden challenge.',
  },
};

/**
 * Checks if a hostname belongs to a private, loopback, or local network.
 */
function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, '');

  if (host === 'localhost' || host.endsWith('.local')) {
    return true;
  }

  // IPv6 loopback and link-local
  if (host === '::1' || host === '0:0:0:0:0:0:0:1' || host.startsWith('fe80:')) {
    return true;
  }

  // IPv4 checks
  const ipv4Match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, aStr, bStr] = ipv4Match;
    const a = parseInt(aStr, 10);
    const b = parseInt(bStr, 10);

    // 127.0.0.0/8 (Loopback)
    if (a === 127) return true;
    // 10.0.0.0/8 (Private)
    if (a === 10) return true;
    // 172.16.0.0/12 (Private: 172.16 - 172.31)
    if (a === 172 && b >= 16 && b <= 31) return true;
    // 192.168.0.0/16 (Private)
    if (a === 192 && b === 168) return true;
    // 169.254.0.0/16 (Link-local)
    if (a === 169 && b === 254) return true;
    // 0.0.0.0
    if (a === 0) return true;
  }

  return false;
}

/**
 * Normalizes and validates an input image URL.
 * - Trims and removes internal whitespace/newlines.
 * - Requires http:// or https://.
 * - Rejects data:, javascript:, file:, blob:.
 * - Rejects URLs > 2000 chars.
 * - Rejects localhost, *.local, private/loopback IPv4 and IPv6.
 */
export function normalizeImageUrl(input: string): NormalizeUrlResult {
  if (!input) {
    return { valid: false, error: 'Link must start with http:// or https://' };
  }

  // Trim and strip internal whitespace and newlines
  const cleaned = input.trim().replace(/\s+/g, '');

  if (!cleaned) {
    return { valid: false, error: 'Link must start with http:// or https://' };
  }

  if (cleaned.length > 2000) {
    return { valid: false, error: 'Link exceeds the maximum length of 2000 characters.' };
  }

  // Scheme verification
  const lower = cleaned.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('file:') ||
    lower.startsWith('blob:')
  ) {
    return {
      valid: false,
      error: 'Data, JavaScript, file, and blob links cannot be searched. Please enter an http:// or https:// link.',
    };
  }

  if (!lower.startsWith('http://') && !lower.startsWith('https://')) {
    return { valid: false, error: 'Link must start with http:// or https://' };
  }

  let parsed: URL;
  try {
    parsed = new URL(cleaned);
  } catch {
    return { valid: false, error: 'Please enter a valid URL.' };
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { valid: false, error: 'Link must start with http:// or https://' };
  }

  if (isPrivateOrLocalHost(parsed.hostname)) {
    return {
      valid: false,
      error: 'Local and private network addresses cannot be reached by search engines.',
    };
  }

  return {
    valid: true,
    url: parsed.toString(),
  };
}

/**
 * Returns a non-blocking warning when the URL looks like a web page rather than a direct image file.
 */
export function warnIfNotDirectImage(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    // Known social / platform web page domains
    const socialHosts = [
      'instagram.com',
      'facebook.com',
      'x.com',
      'twitter.com',
      'tiktok.com',
      'pinterest.com',
    ];

    const isSocialHost = socialHosts.some((h) => host === h || host.endsWith(`.${h}`));
    if (isSocialHost) {
      return 'This looks like a web page, not an image file. Right-click the image and choose Copy image address, then paste that link.';
    }

    // Check pathname extension
    const hasImageExt = /\.(jpe?g|png|webp|gif|bmp|avif)$/i.test(parsed.pathname);

    // Check query parameter hints (e.g., ?format=jpg or ?ext=png)
    const hasQueryHint = /[?&](format|ext|type)=(jpe?g|png|webp|gif|bmp)/i.test(parsed.search);

    if (!hasImageExt && !hasQueryHint) {
      return 'This looks like a web page, not an image file. Right-click the image and choose Copy image address, then paste that link.';
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Compiles the 4 search engine URLs using encodeURIComponent.
 */
export function buildEngineUrls(url: string): EngineUrlMap {
  const enc = encodeURIComponent(url);

  return {
    google: `https://lens.google.com/uploadbyurl?url=${enc}`,
    tineye: `https://tineye.com/search?url=${enc}`,
    bing: `https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:${enc}`,
    yandex: `https://yandex.com/images/search?rpt=imageview&url=${enc}`,
  };
}

/**
 * Engine verification status metadata based on live verification.
 */
export function getEngineVerifications(url: string): Record<'google' | 'tineye' | 'bing' | 'yandex', EngineVerification> {
  const urls = buildEngineUrls(url);

  return {
    google: {
      name: 'Google Lens',
      url: urls.google,
      works: true,
      status: 'works',
      uploadPageUrl: 'https://lens.google.com/',
      note: 'Redirects to visual search results.',
    },
    bing: {
      name: 'Bing Visual Search',
      url: urls.bing,
      works: true,
      status: 'works',
      uploadPageUrl: 'https://www.bing.com/visualsearch',
      note: 'Loads visual search detail view.',
    },
    yandex: {
      name: 'Yandex Images',
      url: urls.yandex,
      works: true,
      status: 'works',
      uploadPageUrl: 'https://yandex.com/images/',
      note: 'Loads image view match results.',
    },
    tineye: {
      name: 'TinEye',
      url: urls.tineye,
      works: false,
      status: 'fails',
      uploadPageUrl: 'https://tineye.com/',
      note: 'TinEye blocks direct query URLs via Cloudflare bot protection. Visit tineye.com directly to paste or upload.',
    },
  };
}
