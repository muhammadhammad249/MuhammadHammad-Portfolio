import Link from 'next/link';
import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';
import FingerprintCompare from './FingerprintCompare';

export const metadata: Metadata = {
  title: 'Image Fingerprint Comparison',
  description: 'Compare two images in your browser to check perceptual similarity. Free, private, and processes entirely on your device.',
  alternates: {
    canonical: canonicalFor('/tools/image-fingerprint-compare'),
  },
  openGraph: {
    title: 'Image Fingerprint Comparison | RepuKeel',
    description: 'Compare two images in your browser to check perceptual similarity. Free, private, and processes entirely on your device.',
    url: canonicalFor('/tools/image-fingerprint-compare'),
  },
};

export default function ImageFingerprintComparePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image Fingerprint Comparison',
    url: 'https://repukeel.com/tools/image-fingerprint-compare',
    description: 'Compare two images in your browser to check perceptual similarity. Free, private, and processes entirely on your device.',
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
      q: 'How does perceptual fingerprinting differ from cryptographic hashes like MD5 or SHA-256?',
      a: 'Cryptographic hashes change completely if even one pixel or byte is modified. Perceptual image hashes (aHash, dHash, pHash) analyze visual structure and frequencies, allowing two differently compressed or resized versions of the same photo to match.',
    },
    {
      q: 'Are the images I compare uploaded to RepuKeel’s servers?',
      a: 'No. All pixel decoding and hash calculations execute locally in your browser. RepuKeel never receives, transmits, or stores your image files.',
    },
    {
      q: 'Can this tool prove copyright infringement?',
      a: 'No. A high similarity score serves as an investigative hint rather than legal proof. Factors like fair use, licensing, and creative transformation require legal review.',
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
            <span className="text-gray-800 font-semibold">Image Fingerprint Comparison</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[800] text-[#0a192f] tracking-tight mb-4">
            Image Fingerprint Comparison
          </h1>

          <p className="text-[16px] sm:text-[17px] text-gray-600 leading-relaxed font-normal">
            Image fingerprint comparison generates perceptual hashes to measure the visual similarity between two pictures. It allows you to check whether a photo or graphic has been reused, resized, lightly compressed, or modified.
          </p>
        </div>
      </section>

      {/* Main Interactive Tool section */}
      <section className="w-full py-10 md:py-14">
        <div className="container max-w-4xl mx-auto px-4">
          <FingerprintCompare />
        </div>
      </section>

      {/* How to use, what score means, limits, FAQs */}
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
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Select Original Image</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Choose or drag-and-drop your reference image into the first panel.
                  </p>
                </div>
              </li>

              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Select Comparison Image</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Choose or drop the suspect or modified image into the second panel.
                  </p>
                </div>
              </li>

              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Choose Match Options</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Enable orientation checks to test rotations and mirrors, or ignore solid border margins.
                  </p>
                </div>
              </li>

              <li className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0c1940] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  4
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] mb-1">Review Similarity</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Inspect the combined similarity percentage, perceptual hash breakdown, and copy the summary report.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* What the score means */}
          <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
            <h2 className="text-lg font-bold text-[#0a192f]">
              What the Score Means
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-white border border-gray-200 space-y-1">
                <div className="font-bold text-emerald-800">90% &ndash; 100%: Very High Similarity</div>
                <p className="text-gray-600">Likely the exact same picture resized, converted between formats, or lightly re-compressed.</p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-gray-200 space-y-1">
                <div className="font-bold text-blue-800">75% &ndash; 89%: High Similarity</div>
                <p className="text-gray-600">Likely the same source image with minor cropping, color balance adjustments, or watermark overlays.</p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-gray-200 space-y-1">
                <div className="font-bold text-amber-800">60% &ndash; 74%: Some Similarity</div>
                <p className="text-gray-600">Shares general layout or luminance distribution, but has significant edits, heavy cropping, or different content.</p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-gray-200 space-y-1">
                <div className="font-bold text-slate-800">Below 60%: Low Similarity</div>
                <p className="text-gray-600">Distinct images or substantial structural alterations that no longer match perceptually.</p>
              </div>
            </div>
          </div>

          {/* Limits section with exact required wording */}
          <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
            <h2 className="text-lg font-bold text-[#0a192f]">
              Limits &amp; Scope
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              The tool works best when it is the same picture resized, saved with different compression, or lightly adjusted; it can miss heavy crops, collages, large overlays and heavy edits; a high score is a hint, not proof of copying; a low score does not prove the images are unrelated; this is not legal advice.
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
                Need to search the web for where an image appears online? Use the{' '}
                <Link
                  href="/tools/reverse-image-search"
                  className="font-semibold text-[#0c1940] hover:text-[#d4af37] underline underline-offset-2"
                >
                  Reverse Image Launcher
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
                href="/dating-reputation/image-protection"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-[#0c1940] hover:bg-[#0c1940] hover:text-white transition-colors"
              >
                Image Protection
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
            Found a copy of your image? Ask RepuKeel about next steps.
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            If you identified unauthorized use of your photos, logos, or creative assets, request a free analysis from our specialist removal team.
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
