import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/api',
        '/dashboard/',
        '/dashboard',
        '/admin/',
        '/admin',
        '/checkout/',
        '/checkout',
      ],
    },
    sitemap: 'https://repukeel.com/sitemap.xml',
  };
}
