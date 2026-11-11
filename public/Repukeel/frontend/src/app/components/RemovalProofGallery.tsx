import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { removalProofEntries, RemovalProofEntry } from '@/data/removalProof';

interface RemovalProofGalleryProps {
  variant?: 'full' | 'compact';
  limit?: number;
  className?: string;
}

export default function RemovalProofGallery({
  variant = 'full',
  limit,
  className = '',
}: RemovalProofGalleryProps) {
  // Only entries that have explicit client consent, are redacted, and have a confirmed file on disk
  const validEntries: RemovalProofEntry[] = removalProofEntries.filter((entry) => {
    if (!entry.clientConsent || !entry.redacted) return false;
    if (!entry.image || entry.image.trim() === '') return false;
    try {
      const filePath = path.join(process.cwd(), 'public', entry.image.replace(/^\//, ''));
      return fs.existsSync(filePath);
    } catch {
      return false;
    }
  });

  // Strict requirement: Render nothing if there are no approved entries (no empty heading, no placeholder cards)
  if (validEntries.length === 0) {
    return null;
  }

  const displayedEntries = limit ? validEntries.slice(0, limit) : validEntries;

  if (variant === 'compact') {
    return (
      <section className={`w-full py-12 ${className}`} aria-label="Review Removal Proof">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[12px] font-[700] text-[var(--gold)] uppercase tracking-widest block mb-1">
                Verified Outcomes
              </span>
              <h3 className="text-2xl sm:text-3xl font-[800] text-[#0f172a]">
                Review Removal Examples
              </h3>
            </div>
            <Link
              href="/case-studies#review-removal-examples"
              className="text-[14px] font-[700] text-[#0A66C2] hover:underline transition-colors shrink-0"
            >
              See more examples &rarr;
            </Link>
          </div>

          <p className="text-[13px] text-gray-500 mb-8 max-w-3xl leading-relaxed italic">
            Screenshots show review pages that were no longer available on the date shown. Outcomes vary by platform policy and case. Client details are removed for privacy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedEntries.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-50 border-b border-gray-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={600}
                    height={450}
                    loading="lazy"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block text-[11px] font-[700] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {item.platform}
                    </span>
                    <span className="text-[12px] font-[600] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {item.outcomeLabel}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-600 mb-3 flex-1">{item.caption}</p>
                  <span className="text-[12px] text-gray-400 font-[500] mt-auto">
                    Status checked: {item.verifiedOn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Full variant for /case-studies
  return (
    <section id="review-removal-examples" className={`w-full py-24 bg-[#f8f9fa] border-t border-gray-200 ${className}`}>
      <div className="container">
        <div className="max-w-3xl mb-12">
          <span className="text-[13px] font-[700] text-[var(--gold)] uppercase tracking-widest block mb-2">
            Documented Precedents
          </span>
          <h2 className="text-3xl md:text-4xl font-[800] text-[#0f172a] mb-4">
            Review Removal Examples
          </h2>
          <p className="text-[14px] text-gray-500 leading-relaxed italic border-l-2 border-[var(--gold)] pl-4 py-1">
            Screenshots show review pages that were no longer available on the date shown. Outcomes vary by platform policy and case. Client details are removed for privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedEntries.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] bg-gray-50 border-b border-gray-100">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={800}
                  height={500}
                  loading="lazy"
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[12px] font-[700] uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {item.platform}
                  </span>
                  <span className="text-[12px] font-[600] text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    {item.outcomeLabel}
                  </span>
                </div>
                <p className="text-[14.5px] text-gray-700 leading-relaxed mb-4 flex-1">
                  {item.caption}
                </p>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[12px] text-gray-400">
                  <span>Status checked: {item.verifiedOn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
