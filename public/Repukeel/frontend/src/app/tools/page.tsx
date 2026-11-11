import Link from 'next/link';
import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';
import { tools } from '@/data/tools';

export const metadata: Metadata = {
  title: 'Free Brand Protection Tools',
  description: 'Free browser-based brand protection utilities to help you investigate copyright infringement, impersonation, and digital exposure online.',
  alternates: {
    canonical: canonicalFor('/tools'),
  },
  openGraph: {
    title: 'Free Brand Protection Tools | RepuKeel',
    description: 'Free browser-based brand protection utilities to help you investigate copyright infringement, impersonation, and digital exposure online.',
    url: canonicalFor('/tools'),
  },
};

export default function ToolsHubPage() {
  const enabledTools = tools.filter((tool) => tool.enabled);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Header section */}
      <section className="w-full bg-white border-b border-gray-200 py-16 md:py-20">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#d4af37]/10 text-[#0c1940] border border-[#d4af37]/30 mb-6">
            Free Utilities
          </div>
          <h1 className="text-4xl md:text-5xl font-[800] text-[#0a192f] tracking-tight mb-4">
            Free Brand Protection Tools
          </h1>
          <p className="text-[17px] md:text-[18px] text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Practical browser-based utilities to help you investigate brand impersonation, copyright infringement, and digital exposure across search engines.
          </p>
        </div>
      </section>

      {/* Grid section */}
      <section className="w-full py-16 flex-grow">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enabledTools.map((tool) => (
              <div
                key={tool.slug}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl hover:border-[#d4af37] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0c1940] text-[#d4af37] flex items-center justify-center mb-6 shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f] mb-3 group-hover:text-[#d4af37] transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
                    {tool.description}
                  </p>
                </div>

                <Link
                  href={tool.href}
                  className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-[#0c1940] text-white font-semibold text-sm hover:bg-[#122353] transition-colors"
                >
                  <span>Open Tool</span>
                  <span className="text-[#d4af37] group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
