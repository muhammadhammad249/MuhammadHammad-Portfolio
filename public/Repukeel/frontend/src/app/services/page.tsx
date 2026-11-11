/* eslint-disable */
'use client';
import { useState } from 'react';
import BlueCtaBand from '../components/BlueCtaBand';
import ServicesMenuLayout from '../components/ServicesMenuLayout';
import { categories } from '@/data/services';

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // Default to first category so desktop shows sub-services immediately on load
  const [activeCatId, setActiveCatId] = useState<string | null>(categories[0]?.slug ?? null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ================= INTERACTIVE SERVICES LAYOUT ================= */}
      <section className="w-full bg-[#f4f7fb] py-16" id="all-services">
        <div className="container max-w-[1400px]">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-[#0a192f] tracking-tight mb-4">
              Comprehensive Reputation &amp; Removal Services
            </h1>
            <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
              Select a category below to explore targeted solutions for content removal, search cleanup, review disputes, and brand protection.
            </p>
          </div>
          <ServicesMenuLayout activeCatId={activeCatId} setActiveCatId={setActiveCatId} />
        </div>
      </section>

      {/* ================= PLATFORM-SPECIFIC TAKEDOWNS ================= */}
      <section className="w-full bg-[var(--bg-soft)] py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-[800] mb-4">Platform-Specific Takedowns</h2>
            <p className="text-[16px] text-black">We hold deep expertise with the legal channels of all major platforms.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Facebook */}
            <div className="rounded-2xl p-8 flex flex-col text-[#0a192f] shadow-xl bg-white border border-gray-200 transition-transform hover:-translate-y-2">
              <div className="text-5xl mb-6 text-blue-600 font-bold">f</div>
              <h3 className="text-2xl font-[800] mb-3">Facebook</h3>
              <p className="text-[15px] text-gray-600">Instant removal of stolen images, videos, and impersonator pages via direct legal channels.</p>
            </div>
            {/* Instagram */}
            <div className="rounded-2xl p-8 flex flex-col text-[#0a192f] shadow-xl bg-white border border-gray-200 transition-transform hover:-translate-y-2">
              <div className="w-10 h-10 border-2 border-[#e1306c] rounded-[10px] relative mb-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#e1306c] rounded-full"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-[#e1306c] rounded-full"></div>
              </div>
              <h3 className="text-2xl font-[800] mb-3">Instagram</h3>
              <p className="text-[15px] text-gray-600">Takedowns of reels, posts, stories, and fake accounts copying your identity or content.</p>
            </div>
            {/* Twitter / X */}
            <div className="rounded-2xl p-8 flex flex-col text-[#0a192f] shadow-xl bg-white border border-gray-200 transition-transform hover:-translate-y-2">
              <div className="text-4xl mb-6 font-bold leading-none">𝕏</div>
              <h3 className="text-2xl font-[800] mb-3">Twitter / X</h3>
              <p className="text-[15px] opacity-90">Swift action against unauthorized media sharing and defamatory tweets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4-COLUMN STRIP ================= */}
      <section className="w-full bg-white py-16 border-y border-[var(--border-light)]">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: '🛡️', title: 'Total Protection' },
            { icon: '⚡', title: 'Fast Results' },
            { icon: '🔒', title: '100% Confidential' },
            { icon: '⚖️', title: 'Legally Compliant' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="text-3xl">{item.icon}</div>
              <h4 className="text-[16px] font-[700] text-black">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BLUE CTA 1 ================= */}
      <BlueCtaBand 
        headingWhite="Ready?"
        headingGold="Get started today!"
        subtext="Don't let copyright infringement harm your brand."
        primaryBtnText="Get Started"
        primaryBtnLink="/contact"
        secondaryBtnText="View Pricing"
        secondaryBtnLink="/pricing"
      />

      {/* ================= TESTIMONIALS ================= */}
      <section className="w-full bg-white py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-[800] mb-4">What people say about our company</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Sarah O'Connor", role: "Content Creator, Marketing Firm", text: "The RepuKeel team took down over 50 stolen images from various sites in just two days. Absolutely life-saving service." },
              { name: "John Doe", role: "Photography", text: "Their monitoring system caught unauthorized use of my portfolio before it could spread. Highly responsive team." },
              { name: "Elena R.", role: "E-Commerce Director", text: "We struggled with fake reviews for months. RepuKeel cleaned up our Trustpilot and Google profiles permanently." }
            ].map((t, i) => (
              <div key={i} className="bg-[var(--bg-soft)] border border-[var(--border-light)] rounded-2xl p-8 flex flex-col">
                <div className="flex gap-1 text-[var(--gold)] mb-6 text-lg">★★★★★</div>
                <p className="italic text-[15px] text-black mb-8 flex-1">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[rgba(217,165,43,0.2)] flex items-center justify-center text-[var(--gold)] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-[700] text-black">{t.name}</h4>
                    <p className="text-[12px] text-black">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DARK NAVY STAT STRIP ================= */}
      <section className="w-full bg-[var(--bg-navy)] py-16">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '500K+', l: 'Pieces of Content Removed' },
            { n: '2K+', l: 'Clients Protected' },
            { n: '99%', l: 'Takedown Success Rate' },
            { n: '24hr', l: 'Average Response Time' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-4xl font-[800] text-[var(--gold)]">{stat.n}</span>
              <span className="text-[13px] font-[500] text-[var(--text-muted-navy)] uppercase tracking-wide">{stat.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHO WE SERVE ================= */}
      <section className="w-full bg-white py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-[800] mb-4">Who We Serve</h2>
            <p className="text-[16px] text-black">Tailored protection solutions for every industry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Content Creators', color: 'bg-pink-100 text-pink-600', icon: '🎨' },
              { title: 'E-Commerce Brands', color: 'bg-blue-100 text-blue-600', icon: '🛍️' },
              { title: 'Educators', color: 'bg-green-100 text-green-600', icon: '📚' },
              { title: 'Enterprises', color: 'bg-purple-100 text-purple-600', icon: '🏢' }
            ].map((ws, i) => (
              <div key={i} className="card-light flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 ${ws.color}`}>
                  {ws.icon}
                </div>
                <h4 className="text-[17px] font-[700] text-black mb-2">{ws.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="w-full bg-[var(--bg-soft)] py-24">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-[800] mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { q: 'Do you work with clients outside of Pakistan?', a: 'Yes, we are a global agency. We work with clients from over 150 countries and issue takedown notices under the DMCA and international copyright treaties.' },
              { q: 'What happens if a site ignores the DMCA notice?', a: 'If a site host ignores our notice, we escalate to the server provider, domain registrar, and search engines to force de-indexing and suspension.' },
              { q: 'Are your services confidential?', a: '100% confidential. We operate under strict NDAs and ensure your privacy is paramount.' },
              { q: 'How do you charge?', a: 'We offer one-time removal fees, or monthly retainer plans for continuous monitoring and unlimited takedowns.' }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-[var(--border-light)] rounded-xl overflow-hidden">
                <button 
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-[700] text-black hover:bg-gray-50"
                  onClick={() => toggleFaq(i)}
                >
                  {faq.q}
                  <span className={`transform transition-transform text-[var(--gold)] ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <div className={`px-6 pb-5 text-[15px] text-black ${openFaq === i ? 'block' : 'hidden'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLUE CTA 2 ================= */}
      <BlueCtaBand 
        headingWhite="Secure Your"
        headingGold="Digital Assets"
        subtext="Join hundreds of creators and brands who trust RepuKeel with their reputation."
        primaryBtnText="Contact Sales"
        primaryBtnLink="/contact"
        secondaryBtnText="Request a Demo"
        secondaryBtnLink="/contact"
      />
      
    </div>
  );
}
