import Link from 'next/link';
import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';
import TrustProfileLinks from '@/app/components/TrustProfileLinks';

export const metadata: Metadata = {
  title: 'About Us | Reputation Experts',
  description: 'Learn about RepuKeel, the premier online reputation management and brand protection agency. Discover our values, philosophy, and process.',
  alternates: {
    canonical: canonicalFor('/about'),
  },
  openGraph: {
    title: 'About Us | Reputation Experts | RepuKeel',
    description: 'Learn about RepuKeel, the premier online reputation management and brand protection agency. Discover our values, philosophy, and process.',
    url: canonicalFor('/about'),
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ================= HERO ================= */}
      <section className="relative w-full py-16 md:py-24 flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-[#0a1128] opacity-80"></div>
        
        <div className="container relative z-10 text-center flex flex-col items-center px-4">
          <div className="pill-badge mb-6 border border-[var(--gold)] text-[var(--gold)] bg-transparent">
            About RepuKeel
          </div>
          <h1 className="text-4xl md:text-6xl font-[900] tracking-tight mb-6 text-white max-w-4xl leading-tight">
            Protecting Your Name.<br/>
            <span className="text-[var(--gold)]">Restoring Your Reputation.</span>
          </h1>
          <p className="text-[18px] md:text-[20px] text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-[400]">
            RepuKeel helps individuals, creators and businesses worldwide remove harmful content and take control of how they appear online.
          </p>
          <Link href="/contact" className="btn btn-gold-solid">
            Get Free Analysis
          </Link>
        </div>
      </section>

      {/* ================= WHO WE ARE & WHAT WE DO ================= */}
      <section className="w-full py-24">
        <div className="container max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[13px] font-[800] text-[var(--gold)] uppercase tracking-widest mb-3 block">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-[800] mb-6 text-[#0a1128]">Online Reputation Management & Brand Protection</h2>
            <div className="w-16 h-1 bg-[var(--gold)] mb-8"></div>
            <p className="text-[16px] text-gray-700 mb-6 leading-relaxed">
              RepuKeel is an online reputation management and brand protection company based in Islamabad, Pakistan. We help clients deal with damaging reviews, stolen content, impersonation, and search results that do not reflect who they are.
            </p>
            <p className="text-[16px] text-gray-700 leading-relaxed">
              We combine takedown expertise, copyright enforcement and search strategy in one service, so you do not have to chase platforms yourself.
            </p>
            <TrustProfileLinks className="mt-8 !justify-start" />
          </div>
          
          <div className="bg-[#f8fafc] p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-[13px] font-[800] text-[var(--gold)] uppercase tracking-widest mb-3 block">What We Do</span>
            <h3 className="text-2xl font-[800] mb-8 text-[#0a1128]">Core Services</h3>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] flex-shrink-0 mt-0.5">✓</div>
                <div>
                  <strong className="text-[#0a1128] block mb-1">Content and review removal:</strong>
                  <span className="text-gray-600 text-[15px]">Fake reviews, harmful posts and impersonating profiles.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] flex-shrink-0 mt-0.5">✓</div>
                <div>
                  <strong className="text-[#0a1128] block mb-1">DMCA and copyright protection:</strong>
                  <span className="text-gray-600 text-[15px]">Takedowns for stolen, leaked or pirated content.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] flex-shrink-0 mt-0.5">✓</div>
                <div>
                  <strong className="text-[#0a1128] block mb-1">Search result cleanup:</strong>
                  <span className="text-gray-600 text-[15px]">De-indexing and suppression of unwanted links.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] flex-shrink-0 mt-0.5">✓</div>
                <div>
                  <strong className="text-[#0a1128] block mb-1">Reputation building:</strong>
                  <span className="text-gray-600 text-[15px]">Positive, accurate content that represents you well.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] flex-shrink-0 mt-0.5">✓</div>
                <div>
                  <strong className="text-[#0a1128] block mb-1">Monitoring:</strong>
                  <span className="text-gray-600 text-[15px]">Early alerts when new content or reposts appear.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}
      <section className="w-full bg-[#f8fafc] py-24 text-[#0a1128]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[13px] font-[800] text-[var(--gold)] uppercase tracking-widest mb-3 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-[800] text-[#0a1128]">How We Work</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative">
              <h4 className="text-[20px] font-[700] mb-3 text-[var(--gold)]">Audit</h4>
              <p className="text-[15px] text-gray-600 leading-relaxed">We review your case and check what can realistically be removed.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative">
              <h4 className="text-[20px] font-[700] mb-3 text-[var(--gold)]">Strategy</h4>
              <p className="text-[15px] text-gray-600 leading-relaxed">You get a clear plan with timelines and costs.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative">
              <h4 className="text-[20px] font-[700] mb-3 text-[var(--gold)]">Action</h4>
              <p className="text-[15px] text-gray-600 leading-relaxed">We file removals, notices and appeals, and build your positive presence.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative">
              <h4 className="text-[20px] font-[700] mb-3 text-[var(--gold)]">Protection</h4>
              <p className="text-[15px] text-gray-600 leading-relaxed">We monitor for reposts and report back to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES & WHY CHOOSE US ================= */}
      <section className="w-full py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Values */}
          <div>
            <span className="text-[13px] font-[800] text-[var(--gold)] uppercase tracking-widest mb-3 block">Our Philosophy</span>
            <h2 className="text-3xl font-[800] mb-8 text-[#0a1128]">Our Values</h2>
            
            <div className="grid gap-6">
              <div className="bg-[#f8fafc] p-6 rounded-xl border border-gray-100">
                <h4 className="text-[18px] font-[700] text-[#0a1128] mb-2">Confidentiality</h4>
                <p className="text-[15px] text-gray-600">Your case stays private. We share nothing without your approval.</p>
              </div>
              <div className="bg-[#f8fafc] p-6 rounded-xl border border-gray-100">
                <h4 className="text-[18px] font-[700] text-[#0a1128] mb-2">Honesty</h4>
                <p className="text-[15px] text-gray-600">We tell you upfront what is and is not possible. No unrealistic promises.</p>
              </div>
              <div className="bg-[#f8fafc] p-6 rounded-xl border border-gray-100">
                <h4 className="text-[18px] font-[700] text-[#0a1128] mb-2">Compliance</h4>
                <p className="text-[15px] text-gray-600">We work only through platform policies and the law.</p>
              </div>
              <div className="bg-[#f8fafc] p-6 rounded-xl border border-gray-100">
                <h4 className="text-[18px] font-[700] text-[#0a1128] mb-2">Responsiveness</h4>
                <p className="text-[15px] text-gray-600">We reply within 24 hours, and urgent DMCA requests are prioritized at any time.</p>
              </div>
            </div>
          </div>
          
          {/* Why Choose Us */}
          <div className="lg:pl-8">
            <span className="text-[13px] font-[800] text-[var(--gold)] uppercase tracking-widest mb-3 block">Benefits</span>
            <h2 className="text-3xl font-[800] mb-8 text-[#0a1128]">Why Clients Choose RepuKeel</h2>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--gold)] text-white flex items-center justify-center font-[700] flex-shrink-0 shadow-md">✓</div>
                <div>
                  <p className="text-[16px] text-gray-800 font-[600] mt-1">One team for removal, suppression and monitoring</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--gold)] text-white flex items-center justify-center font-[700] flex-shrink-0 shadow-md">✓</div>
                <div>
                  <p className="text-[16px] text-gray-800 font-[600] mt-1">Clear reports and regular progress updates</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--gold)] text-white flex items-center justify-center font-[700] flex-shrink-0 shadow-md">✓</div>
                <div>
                  <p className="text-[16px] text-gray-800 font-[600] mt-1">Clients worldwide, with support by WhatsApp and email</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--gold)] text-white flex items-center justify-center font-[700] flex-shrink-0 shadow-md">✓</div>
                <div>
                  <p className="text-[16px] text-gray-800 font-[600] mt-1">Refund or credit if an eligible removal is not achieved</p>
                </div>
              </li>
            </ul>

            <div className="mt-12 bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-[22px] font-[800] text-[#0a1128] mb-3">Not Sure Where to Start?</h3>
              <p className="text-[15px] text-gray-600 mb-6">Get a free reputation analysis and find out what can be removed.</p>
              <Link href="/contact" className="btn btn-navy-solid inline-block w-full text-center">
                Get Free Analysis
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
