import Link from 'next/link';
import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';
import QueryBuilder from './QueryBuilder';

export const metadata: Metadata = {
  title: 'Search Query Builder',
  description: 'Build focused search engine queries with operators and platform filters to investigate potential brand, trademark, or content misuse online.',
  alternates: {
    canonical: canonicalFor('/tools/search-query-builder'),
  },
  openGraph: {
    title: 'Search Query Builder | RepuKeel',
    description: 'Build focused search engine queries with operators and platform filters to investigate potential brand, trademark, or content misuse online.',
    url: canonicalFor('/tools/search-query-builder'),
  },
};

export default function SearchQueryBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Search Query Builder',
    url: 'https://repukeel.com/tools/search-query-builder',
    description: 'Build focused search queries with operators and platform filters to investigate potential brand, trademark, or content misuse online.',
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
      q: 'How does the Search Query Builder work?',
      a: 'It combines your search terms with standard search engine operators like quotation marks for exact matching, site: filters for specific platforms, and -site: operators to exclude your official website.',
    },
    {
      q: 'Are my search inputs stored or sent to a server?',
      a: 'No. All query generation runs entirely within your browser. RepuKeel does not transmit, store, or log the search terms or domains you enter.',
    },
    {
      q: 'Why might a search query return no results?',
      a: 'If a query is very specific or combines multiple narrow parameters, the search engine may not have indexed matching pages. Try unchecking exact match or selecting one platform at a time.',
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
            <span className="text-gray-800 font-semibold">Search Query Builder</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[800] text-[#0a192f] tracking-tight mb-4">
            Search Query Builder
          </h1>

          <p className="text-[16px] sm:text-[17px] text-gray-600 leading-relaxed font-normal">
            The Search Query Builder formats advanced search engine operators to help you find unauthorized uses of your brand name, copyrighted text, or trademarks across public platforms. Select your parameters below to generate and launch targeted queries directly in major search engines.
          </p>
        </div>
      </section>

      {/* Main Interactive Tool section */}
      <section className="w-full py-10 md:py-14">
        <div className="container max-w-4xl mx-auto px-4">
          <QueryBuilder />
        </div>
      </section>

      {/* How to use & limits */}
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
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Choose Search Mode</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Select &quot;Brand / Business&quot; to search your name, or &quot;Text / Content&quot; to look for a distinctive text excerpt.
                  </p>
                </div>
              </li>

              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Add Your Domain</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Enter your official domain to automatically exclude your own website from search results.
                  </p>
                </div>
              </li>

              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Select Platforms &amp; Goals</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Filter by specific public platforms and apply optional investigation goal modifiers.
                  </p>
                </div>
              </li>

              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  4
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Launch in Search Engines</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Copy the generated search string or click any search engine button to view search results in a new tab.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Limits Notice */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-sm leading-relaxed">
            <h3 className="font-bold text-amber-900 mb-1 flex items-center gap-2">
              <span>⚠️</span> Tool Capabilities and Limits
            </h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              This tool builds search queries and opens third-party search engines. It does not scan the web, detect content, or remove anything from the internet.
            </p>
          </div>

          {/* Tool FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-[#0a192f] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="text-sm font-bold text-[#0a192f] mb-2">{faq.q}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tool */}
          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-[#0a192f] mb-3">
              Related Tool
            </h2>
            <p className="text-sm text-gray-600">
              Looking to search by image instead? Use the{' '}
              <Link
                href="/tools/reverse-image-search"
                className="font-semibold text-[#0c1940] hover:text-[#d4af37] underline underline-offset-2"
              >
                Reverse Image Launcher
              </Link>
              .
            </p>
          </div>

          {/* Related Services Links */}
          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-[#0a192f] mb-3">
              Explore Targeted Removal Services
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/content-removal/facebook-review-removal"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-[#0c1940] hover:bg-[#0c1940] hover:text-white transition-colors"
              >
                Facebook Content Removal
              </Link>
              <Link
                href="/content-removal/instagram-content-removal"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-[#0c1940] hover:bg-[#0c1940] hover:text-white transition-colors"
              >
                Instagram Content Removal
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
