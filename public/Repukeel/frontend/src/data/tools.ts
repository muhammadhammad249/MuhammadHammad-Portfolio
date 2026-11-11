export interface ToolItem {
  slug: string;
  title: string;
  description: string;
  href: string;
  enabled: boolean;
}

export const tools: ToolItem[] = [
  {
    slug: 'search-query-builder',
    title: 'Search Query Builder',
    description: 'Build targeted search engine queries with operators and filters to investigate potential brand or content misuse online.',
    href: '/tools/search-query-builder',
    enabled: true,
  },
  {
    slug: 'reverse-image-search',
    title: 'Reverse Image Launcher',
    description: 'Paste an image link and open it in Google Lens, TinEye, Bing Visual Search and Yandex Images.',
    href: '/tools/reverse-image-search',
    enabled: true,
  },
  {
    slug: 'image-fingerprint-compare',
    title: 'Image Fingerprint Compare',
    description: 'Compare two images in your browser and see how similar they are. Nothing is uploaded.',
    href: '/tools/image-fingerprint-compare',
    enabled: true,
  },
];
