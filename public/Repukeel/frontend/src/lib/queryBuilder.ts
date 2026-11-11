import { PLATFORMS } from '../data/queryPresets.ts';

export type SearchMode = 'brand' | 'text';

export type DateRange = 'all' | '24h' | 'week' | 'month' | 'year';

export interface BuildQueryOptions {
  mode: SearchMode;
  brandName?: string;
  textContent?: string;
  officialDomain?: string;
  exactMatch?: boolean;
  extraKeywords?: string;
  selectedPlatforms?: string[]; // platform ids or domains
  goalModifier?: string;
}

export interface BuildQueryResult {
  query: string;
  errors: Record<string, string>;
  wordCount: number;
  isTruncationRisk: boolean;
}

/**
 * Strips double quotes, control characters, and collapses whitespace.
 */
export function cleanInputText(text: string): string {
  if (!text) return '';
  return text
    // Remove double quotes
    .replace(/["“”״]/g, '')
    // Remove non-printable control characters
    .replace(/[\x00-\x1F\x7F]/g, ' ')
    // Collapse multiple whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalizes an official domain into clean root domain format:
 * - lowercase
 * - strips protocol (http://, https://)
 * - strips leading www.
 * - strips trailing path, queries, and hash
 * - rejects values with spaces
 */
export function normalizeDomain(input: string): { valid: boolean; domain?: string; error?: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: true };
  }

  // Reject spaces
  if (/\s/.test(trimmed)) {
    return { valid: false, error: 'Domain cannot contain spaces.' };
  }

  let cleaned = trimmed.toLowerCase();

  // Strip protocol
  cleaned = cleaned.replace(/^https?:\/\//, '');

  // Strip www.
  cleaned = cleaned.replace(/^www\./, '');

  // Strip path, query, hash
  cleaned = cleaned.replace(/[/?#].*$/, '');

  // Strip port
  cleaned = cleaned.replace(/:\d+$/, '');

  // Strip trailing dot/slash
  cleaned = cleaned.replace(/[./]+$/, '');

  // Must look like a valid hostname (at least one dot, valid chars)
  if (!cleaned || !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(cleaned)) {
    return { valid: false, error: 'Please enter a valid domain (e.g., example.com).' };
  }

  return { valid: true, domain: cleaned };
}

/**
 * Counts words in a search query string.
 */
export function countQueryWords(query: string): number {
  if (!query || !query.trim()) return 0;
  return query.trim().split(/\s+/).length;
}

/**
 * Pure function to build a search query string based on user inputs.
 */
export function buildSearchQuery(options: BuildQueryOptions): BuildQueryResult {
  const errors: Record<string, string> = {};
  const exactMatch = options.exactMatch !== false; // default true

  // Validate core term
  let coreTerm = '';
  if (options.mode === 'brand') {
    const cleaned = cleanInputText(options.brandName || '');
    if (!cleaned) {
      errors.brand = 'Brand name is required.';
    } else {
      coreTerm = exactMatch ? `"${cleaned}"` : cleaned;
    }
  } else {
    const cleaned = cleanInputText(options.textContent || '');
    if (!cleaned) {
      errors.text = 'Text to find is required.';
    } else {
      coreTerm = exactMatch ? `"${cleaned}"` : cleaned;
    }
  }

  // Validate official domain
  let normalizedDomain = '';
  if (options.officialDomain && options.officialDomain.trim()) {
    const domResult = normalizeDomain(options.officialDomain);
    if (!domResult.valid) {
      errors.domain = domResult.error || 'Invalid domain.';
    } else {
      normalizedDomain = domResult.domain || '';
    }
  }

  // If there are validation errors, return empty query
  if (Object.keys(errors).length > 0) {
    return {
      query: '',
      errors,
      wordCount: 0,
      isTruncationRisk: false,
    };
  }

  const parts: string[] = [coreTerm];

  // Extra keywords (up to 5 words)
  if (options.extraKeywords && options.extraKeywords.trim()) {
    const cleanedKeywords = cleanInputText(options.extraKeywords);
    if (cleanedKeywords) {
      const keywordTerms = cleanedKeywords.split(/\s+/).slice(0, 5).join(' ');
      if (keywordTerms) {
        parts.push(keywordTerms);
      }
    }
  }

  // Investigation goal modifier
  if (options.goalModifier && options.goalModifier.trim()) {
    parts.push(options.goalModifier.trim());
  }

  // Platforms: map to site:domain
  if (options.selectedPlatforms && options.selectedPlatforms.length > 0) {
    const platformDomains: string[] = [];
    for (const item of options.selectedPlatforms) {
      const matched = PLATFORMS.find((p) => p.id === item || p.domain === item);
      const domain = matched ? matched.domain : item;
      if (domain && !platformDomains.includes(domain)) {
        platformDomains.push(domain);
      }
    }

    if (platformDomains.length === 1) {
      parts.push(`site:${platformDomains[0]}`);
    } else if (platformDomains.length > 1) {
      const orClauses = platformDomains.map((d) => `site:${d}`).join(' OR ');
      parts.push(`(${orClauses})`);
    }
  }

  // Exclude official domain
  if (normalizedDomain) {
    parts.push(`-site:${normalizedDomain}`);
  }

  const finalQuery = parts.join(' ').trim();
  const wordCount = countQueryWords(finalQuery);
  const isTruncationRisk = wordCount > 30;

  return {
    query: finalQuery,
    errors: {},
    wordCount,
    isTruncationRisk,
  };
}

/**
 * Splits longer text into up to 3 sentence-based queries when in text mode.
 */
export function splitTextIntoQueries(
  textContent: string,
  options: Omit<BuildQueryOptions, 'mode' | 'textContent'>
): string[] {
  const cleaned = cleanInputText(textContent);
  if (!cleaned) return [];

  // Split by sentence boundaries (. ! ? \n)
  const rawSentences = cleaned
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  // Take up to 3 sentences
  const sentences = rawSentences.slice(0, 3);
  if (sentences.length === 0) {
    sentences.push(cleaned.slice(0, 150));
  }

  return sentences.map((sentence) => {
    const res = buildSearchQuery({
      ...options,
      mode: 'text',
      textContent: sentence,
    });
    return res.query;
  }).filter(Boolean);
}

export type SearchEngine = 'google' | 'bing' | 'duckduckgo' | 'yandex';

export interface EngineUrlResult {
  url: string;
  dateSupported: boolean;
  unsupportedMessage?: string;
}

/**
 * Generates the external search engine URL with query parameters.
 */
export function buildEngineUrl(
  engine: SearchEngine,
  query: string,
  dateRange: DateRange = 'all'
): EngineUrlResult {
  const encodedQuery = encodeURIComponent(query);

  switch (engine) {
    case 'google': {
      let url = `https://www.google.com/search?q=${encodedQuery}`;
      if (dateRange !== 'all') {
        const dateCodeMap: Record<DateRange, string> = {
          all: '',
          '24h': 'd',
          week: 'w',
          month: 'm',
          year: 'y',
        };
        url += `&tbs=qdr:${dateCodeMap[dateRange]}`;
      }
      return { url, dateSupported: true };
    }

    case 'duckduckgo': {
      let url = `https://duckduckgo.com/?q=${encodedQuery}`;
      if (dateRange !== 'all') {
        const ddgDateMap: Record<DateRange, string> = {
          all: '',
          '24h': 'd',
          week: 'w',
          month: 'm',
          year: 'y',
        };
        url += `&df=${ddgDateMap[dateRange]}`;
      }
      return { url, dateSupported: true };
    }

    case 'bing': {
      return {
        url: `https://www.bing.com/search?q=${encodedQuery}`,
        dateSupported: false,
        unsupportedMessage: 'Date filter not supported in external URL for Bing',
      };
    }

    case 'yandex': {
      return {
        url: `https://yandex.com/search/?text=${encodedQuery}`,
        dateSupported: false,
        unsupportedMessage: 'Date filter not supported in external URL for Yandex',
      };
    }

    default:
      return { url: `https://www.google.com/search?q=${encodedQuery}`, dateSupported: true };
  }
}
