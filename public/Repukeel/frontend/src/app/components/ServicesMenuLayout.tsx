import Link from 'next/link';
import { categories } from '@/data/services';

interface Props {
  activeCatId: string | null;
  setActiveCatId: (id: string | null) => void;
  onLinkClick?: () => void;
}

export default function ServicesMenuLayout({ activeCatId, setActiveCatId, onLinkClick }: Props) {
  const handleLinkClick = () => {
    if (onLinkClick) onLinkClick();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Left Sidebar Tabs */}
        <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-2">
          {categories.map(cat => {
            const isActive = activeCatId === cat.slug;
            return (
              <div key={cat.slug} className="flex flex-col">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Desktop (lg+): always select — never collapse. Mobile: toggle accordion.
                    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                      setActiveCatId(cat.slug);
                    } else {
                      setActiveCatId(isActive ? null : cat.slug);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-[800] text-[14px] transition-all duration-200 relative ${
                    isActive
                      ? 'bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-10'
                      : 'bg-transparent text-black hover:bg-gray-300 hover:translate-x-1 hover:shadow-md'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#f8fafc] flex items-center justify-center border border-[var(--border-light)] text-[15px] text-black" aria-hidden="true">
                    {cat.icon}
                  </div>
                  <span>{cat.name}</span>
                  {/* Chevron — mobile accordion indicator only */}
                  <div className="ml-auto lg:hidden">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                  </div>
                  {/* Active notch arrow for desktop */}
                  {isActive && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-r border-[rgba(0,0,0,0.02)]"></div>
                  )}
                </button>

                {/* Mobile Sub-services (Accordion) — always in DOM for crawlability */}
                <div className={`lg:hidden mt-2 mb-4 px-2 flex flex-col gap-2 anim-fade-in ${isActive ? 'block' : 'hidden'}`}>
                  {cat.subServices.map((sol) => (
                    <Link
                      key={sol.slug}
                      href={`/${cat.slug}/${sol.slug}`}
                      onClick={handleLinkClick}
                      className="bg-[#f8f9fc] hover:bg-gray-200 rounded-xl p-3 font-[800] text-[13px] text-black flex items-center justify-between border border-gray-200 shadow-sm"
                    >
                      <span>{sol.name}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-black"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Main Content (Desktop Only) — all categories rendered in DOM for server crawlability */}
        <div className="hidden lg:block flex-1 bg-white rounded-3xl p-6 lg:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative z-0">
          {categories.map((cat) => {
            const isSelected = activeCatId === cat.slug;
            return (
              <div
                key={cat.slug}
                className={isSelected ? 'block' : 'hidden'}
                aria-hidden={!isSelected}
              >
                <h3 className="text-[13px] font-[900] text-black uppercase tracking-widest mb-4">
                  Solutions for {cat.name}
                </h3>

                <div className="w-full bg-[#20409a] rounded-xl p-4 mb-6 flex items-center gap-3 text-white shadow-lg">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-lg text-white">
                    {cat.icon}
                  </div>
                  <h2 className="text-[18px] font-[900] text-white">{cat.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.subServices.map((sol) => (
                    <div key={sol.slug} className="flex flex-col gap-3">
                      <Link
                        href={`/${cat.slug}/${sol.slug}`}
                        onClick={handleLinkClick}
                        className="bg-[#f8f9fc] hover:bg-gray-200 hover:shadow-md hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 rounded-xl p-4 font-[800] text-[14px] text-black flex items-center justify-between group border border-gray-200 shadow-sm"
                      >
                        <span>{sol.name}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-black opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Hubs Navigation */}
      <div className="w-full bg-white rounded-2xl p-6 mt-4 border border-[var(--border-light)] shadow-sm">
        <h4 className="text-[14px] font-[700] text-gray-900 mb-3">Browse Service Category Hubs:</h4>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              onClick={handleLinkClick}
              className="text-[13px] bg-[#f8f9fc] hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-xl border border-gray-200 transition-all font-semibold flex items-center gap-2"
            >
              <span aria-hidden="true">{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="w-full bg-white border-t border-[var(--border-light)] mt-2 pt-6 pb-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-[18px] md:text-[20px] font-[900] text-black">
          Need Different Solutions?
        </h3>
        <Link
          href="/contact"
          onClick={handleLinkClick}
          className="bg-[#20409a] hover:bg-[#1a337a] text-white px-8 py-3 rounded text-[14px] font-[800] transition-colors shadow-sm tracking-wider"
        >
          CONTACT US
        </Link>
      </div>
    </div>
  );
}
