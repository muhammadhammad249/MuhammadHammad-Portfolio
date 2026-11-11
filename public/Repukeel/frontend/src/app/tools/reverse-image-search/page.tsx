import Link from 'next/link';
import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';
import ImageLauncher from './ImageLauncher';

export const metadata: Metadata = {
  title: 'Reverse Image Search Launcher',
  description: 'Paste an image link or upload a file from your device to search it across Google Lens, TinEye, Bing Visual Search and Yandex Images. Free, private, runs in your browser.',
  alternates: {
    canonical: canonicalFor('/tools/reverse-image-search'),
  },
  openGraph: {
    title: 'Reverse Image Search Launcher | RepuKeel',
    description: 'Paste an image link or upload a file from your device to search it across Google Lens, TinEye, Bing Visual Search and Yandex Images. Free, private, runs in your browser.',
    url: canonicalFor('/tools/reverse-image-search'),
  },
};

export default function ReverseImageSearchPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse Image Search Launcher',
    url: 'https://repukeel.com/tools/reverse-image-search',
    description: 'Paste an image link or upload a file from your device to search it across Google Lens, TinEye, Bing Visual Search and Yandex Images. Free, private, runs in your browser.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqs = [
    {
      q: 'Why does an engine show 0 results for an image I know is online?',
      a: 'It may not be indexed yet, the host might block search engine crawlers via robots.txt, or the image was posted inside a private group/account.',
    },
    {
      q: 'Are the images I search or upload stored or shared by RepuKeel?',
      a: 'No. All links and file uploads are processed directly in your browser. When submitting an image file, the browser sends it straight to the search engine you selected. RepuKeel’s servers never see, receive, or store your image URLs or uploaded files.',
    },
    {
      q: 'Which search engine is best for reverse image search?',
      a: 'Google Lens is strong on products and landmarks; Yandex often finds exact duplicates and face matches; TinEye tracks where an image first appeared; Bing Visual Search is strong on merchandise. Using more than one engine gives the most complete picture.',
    },
    {
      q: 'Can I use this tool to look up or identify people?',
      a: 'No. This tool is designed for brand protection, verifying unauthorized use of your own creative assets, and copyright monitoring. It must not be used to identify, monitor, or track individuals.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Schema.org WebApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header section */}
      <section className="w-full bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-medium">
            <Link href="/" className="hover:text-[#0c1940]">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-[#0c1940]">Free Tools</Link>
            <span>/</span>
            <span className="text-gray-800 font-semibold">Reverse Image Search Launcher</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[800] text-[#0a192f] tracking-tight mb-4">
            Reverse Image Search Launcher
          </h1>

          <p className="text-[16px] sm:text-[17px] text-gray-600 leading-relaxed font-normal">
            Reverse image search finds other places where an image, or a similar image, appears on the public web. Paste a public image link or select a file directly from your device to check whether your photos, logos, graphics, or product visuals are appearing elsewhere online.
          </p>
        </div>
      </section>

      {/* Main Interactive Tool section */}
      <section className="w-full py-10 md:py-14">
        <div className="container max-w-4xl mx-auto px-4">
          <ImageLauncher />
        </div>
      </section>

      {/* How to use, tips, limits, FAQs */}
      <section className="w-full py-12 bg-white border-y border-gray-200">
        <div className="container max-w-4xl mx-auto px-4 space-y-12">
          {/* How to use */}
          <div>
            <h2 className="text-2xl font-bold text-[#0a192f] mb-6">
              How to Use This Tool
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-6 list-none p-0">
              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Choose Search Method</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Select &quot;Image link&quot; to paste an image URL, or &quot;Upload from device&quot; to choose a JPG, PNG, WebP, or GIF file.
                  </p>
                </div>
              </li>

              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Review &amp; Preview</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Confirm your URL is valid or review the local thumbnail preview before submitting.
                  </p>
                </div>
              </li>

              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Launch Search Engines</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Click an engine button to open search results directly in Google Lens, Yandex, Bing, or TinEye.
                  </p>
                </div>
              </li>

              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  4
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Document Results</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    If you find unauthorized copies, document the URLs and timestamps for removal requests.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Tips */}
          <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
            <h2 className="text-lg font-bold text-[#0a192f] mb-3">
              Search Tips
            </h2>
            <ul className="space-y-2 text-xs text-gray-700 list-disc list-inside">
              <li>Use direct image URLs (ending in .jpg, .jpeg, .png, .webp) or upload image files up to 10 MB.</li>
              <li>Search engines may take days or weeks to index new images.</li>
              <li>Crop or watermarked variations might need a manual search on each engine.</li>
              <li>For engines requiring interactive upload, use the direct upload page links provided.</li>
            </ul>
          </div>

          {/* Limits note */}
          <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-200">
            <h2 className="text-lg font-bold text-[#0a192f] mb-2">
              Limits &amp; Scope
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              Search engines index publicly reachable web pages only. Private accounts, direct messages, behind-login content and intra-app content (Telegram, WhatsApp, Discord) will NOT show up. This tool does not scan the web, does not detect stolen images, and does not store or process your images. When using device upload, your file is sent from your browser directly to the search engine you choose; RepuKeel never receives, inspects, or stores your file.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-[#0a192f] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="font-bold text-sm text-[#0a192f] mb-2">{faq.q}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-[#0a192f] mb-3">
              Related Tools
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Want to compare two images side-by-side to check similarity? Use the{' '}
                <Link
                  href="/tools/image-fingerprint-compare"
                  className="font-semibold text-[#0c1940] hover:text-[#d4af37] underline underline-offset-2"
                >
                  Image Fingerprint Compare
                </Link>
                .
              </p>
              <p>
                Looking to search by brand name, keywords, or text? Use the{' '}
                <Link
                  href="/tools/search-query-builder"
                  className="font-semibold text-[#0c1940] hover:text-[#d4af37] underline underline-offset-2"
                >
                  Search Query Builder
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Related Services Links */}
          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-[#0a192f] mb-3">
              Explore Targeted Removal Services
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/content-removal/instagram-content-removal"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-[#0c1940] hover:bg-[#0c1940] hover:text-white transition-colors"
              >
                Instagram Content Removal
              </Link>
              <Link
                href="/content-removal/facebook-review-removal"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-[#0c1940] hover:bg-[#0c1940] hover:text-white transition-colors"
              >
                Facebook Content Removal
              </Link>
              <Link
                href="/content-removal/fake-review-removal"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-[#0c1940] hover:bg-[#0c1940] hover:text-white transition-colors"
              >
                Fake Review Removal
              </Link>
              <Link
                href="/services"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-[#0c1940] hover:bg-[#0c1940] hover:text-white transition-colors"
              >
                All Services &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section to /request-free-analysis */}
      <section className="w-full bg-[#0c1940] py-14 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Need help removing what you found?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            If you identified unauthorized content, impersonator profiles, or trademark infringement, request a free analysis from our specialist removal team.
          </p>
          <Link
            href="/request-free-analysis"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#d4af37] text-[#0c1940] font-bold text-sm hover:bg-[#c49f27] transition-colors shadow-md"
          >
            Request Free Analysis
          </Link>
        </div>
      </section>
    </div>
  );
}
