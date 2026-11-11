import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceRedirects = JSON.parse(
  fs.readFileSync(new URL('./src/data/serviceRedirects.json', import.meta.url), 'utf8')
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Redirect ALL *.vercel.app deployment URLs → canonical domain
      // Covers production alias (repukeel.vercel.app) and all preview deploys
      {
        source: '/scanner',
        destination: '/tools/search-query-builder',
        permanent: true,
      },
      {
        source: '/blogs/online-reputation-management-how-repukeel-helps-you-remove-bad-reviews-and-protect-your-brand',
        destination: '/blogs/online-reputation-management-guide',
        permanent: true,
      },
      {
        source: '/blogs/onlyfans-content-leaked-how-to-remove-it-fast-and-protect-your-privacy',
        destination: '/blogs/remove-leaked-onlyfans-content',
        permanent: true,
      },
      {
        source: '/blogs/brand-ip-protection-how-to-safeguard-your-business-online',
        destination: '/blogs/brand-and-ip-protection-guide',
        permanent: true,
      },
      {
        source: '/blogs/dmca-takedown-claims-explained-how-to-remove-stolen-content-online',
        destination: '/blogs/dmca-takedown-claims-guide',
        permanent: true,
      },
      {
        source: '/blogs/how-to-remove-fake-google-reviews-a-complete-guide-by-repukeel',
        destination: '/blogs/remove-fake-google-reviews',
        permanent: true,
      },
      {
        source: '/blogs/how-to-report-and-remove-a-fake-impersonating-profile-online',
        destination: '/blogs/remove-fake-impersonating-profiles',
        permanent: true,
      },
      {
        source: '/blogs/how-to-remove-your-mugshot-from-google-repukeel-s-complete-guide',
        destination: '/blogs/remove-mugshots-from-google',
        permanent: true,
      },
      {
        source: '/blogs/social-media-takedowns-how-to-remove-harassing-or-fake-content-fast',
        destination: '/blogs/social-media-takedowns-guide',
        permanent: true,
      },
      {
        source: '/blogs/how-to-remove-trustpilot-reviews-legally-repukeel-s-expert-guide',
        destination: '/blogs/remove-fake-trustpilot-reviews',
        permanent: true,
      },
      {
        source: '/use-cases/:slug*',
        destination: '/services',
        permanent: true,
      },
      // Redirect /services/[slug] directly to canonical /[category]/[slug]
      ...serviceRedirects,
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<host>.+\\.vercel\\.app)',
          },
        ],
        destination: 'https://repukeel.com/:path*',
        permanent: true,
      },
      // Redirect www → non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.repukeel.com',
          },
        ],
        destination: 'https://repukeel.com/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/:path*`,
      },
    ];
  },
  async headers() {
    const isNonProduction = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';

    const globalHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
      },
      ...(isNonProduction ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
    ];

    return [
      {
        source: '/(.*)',
        headers: globalHeaders,
      },
      {
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  }
};

export default nextConfig;
