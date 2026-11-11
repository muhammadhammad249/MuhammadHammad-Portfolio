/* eslint-disable */
import RemovalProofGallery from '@/app/components/RemovalProofGallery';

export default function CaseStudiesPage() {
  const cases = [
    { tag: "Leaked Content", title: "Adult Creator: 847 URLs Removed in 72 Hours", desc: "A content creator found their private content distributed across 12 unauthorized platforms. Our team issued parallel DMCA notices and achieved complete removal within 72 hours.", stats: ["847 URLs", "12 Platforms", "72 Hours", "100% Removed"] },
    { tag: "Brand Impersonation", title: "SaaS Company: Fake Social Profiles Deleted", desc: "A software company was losing customers to a scammer impersonating their brand on Twitter and Instagram. We secured the removal of 5 fake profiles and recovered stolen funds.", stats: ["5 Profiles", "2 Networks", "24 Hours", "Zero Downtime"] },
    { tag: "Copyright Protection", title: "Educator: Course Content Stolen from 8 Sites", desc: "An online educator's full video course was pirated across 8 platforms. We secured DMCA takedowns and helped establish ongoing copyright protection.", stats: ["8 Platforms", "350+ Videos", "5 Days", "100% Removed"] },
  ];

  return (
    <div className="min-h-screen bg-[#080e1c] text-[#f4f6fb] font-sans pb-24">
      {/* Header */}
      <div className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <p className="text-xs font-bold text-[#e0ac2f] uppercase tracking-[2px] mb-3">Case Studies</p>
        <h1 className="text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.2] mb-6 !text-white">Real Results. Real Protection.</h1>
        <p className="text-[15px] text-[#a9b3c9] leading-relaxed max-w-2xl mx-auto">
          See how RepuKeel has helped creators and brands worldwide recover their stolen assets and protect their digital footprint.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto px-6">
        <div className="space-y-12">
          {cases.map((c, i) => (
            <div key={i} className="bg-[#16223c] border border-[#22304d] rounded-2xl overflow-hidden hover:border-[#e0ac2f] transition-all duration-300 shadow-xl group">
              <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgba(224,172,47,0.1)] text-[#e0ac2f] mb-6">
                    {c.tag}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 !text-white group-hover:!text-[#e0ac2f] transition-colors">{c.title}</h2>
                  <p className="text-[#a9b3c9] text-[15px] leading-relaxed mb-6">{c.desc}</p>
                  <a href="/protection" className="text-[#e0ac2f] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Get Similar Results &rarr;
                  </a>
                </div>
                
                <div className="md:w-72 flex-shrink-0 bg-[#0c1526] rounded-xl p-6 border border-[#22304d]">
                  <h4 className="text-xs font-bold text-[#a9b3c9] uppercase tracking-wider mb-4 border-b border-[#22304d] pb-2">Impact Summary</h4>
                  <ul className="space-y-4">
                    {c.stats.map((stat, si) => (
                      <li key={si} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#e0ac2f]"></div>
                         <span className="text-sm font-bold text-[#f4f6fb]">{stat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Removal Examples Proof Section */}
      <RemovalProofGallery variant="full" className="mt-20" />
    </div>
  );
}
