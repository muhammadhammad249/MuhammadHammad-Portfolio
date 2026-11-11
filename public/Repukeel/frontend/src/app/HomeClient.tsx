/* eslint-disable */
'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TrustProfileLinks from './components/TrustProfileLinks';

export default function HomeClient({ proofGallery }: { proofGallery?: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full pt-16 pb-32 overflow-hidden bg-gradient-to-tr from-[#fef4d8] via-[#fdfaf3] to-[#eef4ff]">
        {/* Very Faint Grid Background */}
        <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        {/* Extra Golden Glow on the left */}
        <div className="absolute top-0 left-0 w-[600px] h-[100%] bg-gradient-to-r from-[#fae7b5] to-transparent opacity-60 pointer-events-none"></div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start items-center pt-8">
          
          {/* Left Column */}
          <div className="relative z-10">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] leading-[1.05] tracking-tight mb-8 text-[#111827]">
              Best Online<br/>
              <span className="text-[#d4af37]">Reputation Management</span><br/>
              Company<br/>
              WorldWide
            </h1>
            <p className="text-[17px] text-[#4b5563] mb-10 max-w-lg leading-relaxed">
              At RepuKeel Reputation, we remove harmful online content — from <Link href="/content-removal/google-review-removal" className="text-[#d4af37] hover:underline font-semibold">fake Google reviews</Link> and <Link href="/content-removal/trustpilot-review-removal" className="text-[#d4af37] hover:underline font-semibold">Trustpilot reviews</Link> to <Link href="/content-removal/mugshot-removal-suppression" className="text-[#d4af37] hover:underline font-semibold">mugshots</Link> and <Link href="/content-removal/fake-review-removal" className="text-[#d4af37] hover:underline font-semibold">fake reviews</Link> — repair search results, and protect your reputation fast, confidentially, and with proven results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/protection" className="btn btn-navy-solid shadow-xl" style={{ padding: '16px 36px', fontSize: '16px' }}>Get Protection Now &rarr;</Link>
              <a href="#services" className="btn btn-outline-dark" style={{ padding: '16px 36px', fontSize: '16px' }}>View Services</a>
            </div>

            <div className="flex flex-wrap gap-3">
              {['No Win, No Fee', '24/7 Support', 'Global Coverage', 'Legal Compliance'].map((pill, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white border border-[#e5e7eb] rounded-full px-3 py-1.5 text-[12px] font-[600] text-[#1f2937] shadow-sm">
                  <div className="w-4 h-4 rounded-full bg-[#22c55e] flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  {pill}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column exactly matching original dmca html structure */}
          <div className="relative h-[480px] w-full mt-12 lg:mt-0 flex items-center justify-center">
            <style>{`
              @keyframes spin-slow {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
              }
              @keyframes spin-slow-reverse {
                from { transform: translate(-50%, -50%) rotate(360deg); }
                to { transform: translate(-50%, -50%) rotate(0deg); }
              }
              @keyframes bob-1 {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              @keyframes bob-2 {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-12px); }
              }
              @keyframes bob-3 {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
              }
              @keyframes scroll-dot {
                0% { transform: translate(-50%, 0); opacity: 1; }
                100% { transform: translate(-50%, 12px); opacity: 0; }
              }
              .anim-spin-bg-1 { animation: spin-slow 45s linear infinite; }
              .anim-spin-bg-2 { animation: spin-slow-reverse 60s linear infinite; }
              .anim-spin-bg-3 { animation: spin-slow 50s linear infinite; }
              .anim-spin-blobs { animation: spin-slow 38s linear infinite; }
              
              .anim-bob-1 { animation: bob-1 4s ease-in-out infinite; }
              .anim-bob-2 { animation: bob-2 3.5s ease-in-out infinite 0.5s; }
              .anim-bob-3 { animation: bob-3 4.5s ease-in-out infinite 1s; }
              .anim-scroll-dot { animation: scroll-dot 1.5s ease-out infinite; }
            `}</style>
            
            {/* Background Dashed Rings & Dots */}
            <div className="absolute top-1/2 left-1/2 w-[340px] h-[340px] border border-dashed border-[#dca12b] opacity-20 rounded-full anim-spin-bg-1 z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 w-[420px] h-[420px] border border-dashed border-[#9ca3af] opacity-25 rounded-full anim-spin-bg-2 z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-dashed border-[#dca12b] opacity-15 rounded-full anim-spin-bg-3 z-0 pointer-events-none"></div>

            {/* Scattered dots */}
            <div className="absolute top-[15%] left-[25%] w-2 h-2 bg-[#dca12b] rounded-full opacity-60 z-0"></div>
            <div className="absolute top-[35%] right-[15%] w-1.5 h-1.5 bg-[#dca12b] rounded-full opacity-50 z-0"></div>
            <div className="absolute bottom-[20%] right-[25%] w-2.5 h-2.5 bg-[#dca12b] rounded-full opacity-70 z-0"></div>
            <div className="absolute bottom-[10%] left-[30%] w-1.5 h-1.5 bg-[#dca12b] rounded-full opacity-60 z-0"></div>

            {/* Orbiting Blobs Group */}
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] anim-spin-blobs z-10 pointer-events-none">
              {/* Blue pill top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35px] h-[60px] bg-[#3b82f6] rounded-full shadow-lg"></div>
              {/* Orange pill right */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[60px] h-[35px] bg-[#f59e0b] rounded-full shadow-lg"></div>
              {/* Green pill bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[35px] h-[60px] bg-[#22c55e] rounded-full shadow-lg"></div>
              {/* Purple pill left */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[35px] bg-[#a855f7] rounded-full shadow-lg"></div>
            </div>

            {/* Main White Card (PERFECTLY STILL) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[295px] bg-white rounded-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.1)] flex items-center justify-center z-15 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="#dca12b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[130px] h-[130px]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4" strokeWidth="2"/>
              </svg>
            </div>

            {/* Floating Stat Badges (Highest Z-Index) */}
            {/* Top Right: Gold Rating Badge */}
            <div className="absolute top-[8%] right-[5%] z-20 shadow-[0_10px_24px_rgba(0,0,0,0.15)] bg-[#dca12b] rounded-[18px] py-[14px] px-[20px] text-center text-white w-[110px] anim-bob-1 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6 mb-1 mx-auto"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span className="block text-[24px] font-[800] leading-[1.1]">4.9<span className="text-[16px]">★</span></span>
              <span className="block text-[12px] font-[600] mt-[2px]">Rating</span>
            </div>

            {/* Bottom Right: Blue Response Badge */}
            <div className="absolute bottom-[30%] -right-[3%] z-20 shadow-[0_10px_24px_rgba(0,0,0,0.15)] bg-[#3b82f6] rounded-[18px] py-[14px] px-[20px] text-center text-white w-[110px] anim-bob-2 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6 mb-1 mx-auto"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <span className="block text-[24px] font-[800] leading-[1.1]">24h</span>
              <span className="block text-[12px] font-[600] mt-[2px]">Response</span>
            </div>

            {/* Bottom Left: Green Success Badge */}
            <div className="absolute bottom-[5%] left-[8%] z-20 shadow-[0_10px_24px_rgba(0,0,0,0.15)] bg-[#22c55e] rounded-[18px] py-[16px] px-[20px] text-left text-white w-[120px] anim-bob-3 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-6 h-6 mb-2"><path d="M22 7L13.5 15.5 8.5 10.5 2 17M16 7h6v6"/></svg>
              <span className="block text-[26px] font-[800] leading-[1.1]">99%</span>
              <span className="block text-[12px] font-[600] mt-[2px]">Success</span>
            </div>
            
            {/* Scroll Hint */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="text-[11px] font-[600] text-[#9ca3af] uppercase tracking-wider">Scroll to explore</span>
              <div className="w-[20px] h-[32px] rounded-full border-2 border-[#d1d5db] relative">
                <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-[#9ca3af] rounded-full anim-scroll-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="w-full bg-[var(--bg-navy)] py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '500K+', l: 'Content Pieces Removed' },
            { n: '2K+', l: 'Clients Protected' },
            { n: '99%', l: 'Success Rate' },
            { n: '150+', l: 'Countries Covered' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-4xl font-[800] text-[var(--gold)]">{stat.n}</span>
              <span className="text-[14px] font-[500] text-[var(--text-muted-navy)]">{stat.l}</span>
            </div>
          ))}
        </div>
      </section>


      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="w-full bg-white py-24 border-t border-[var(--border-light)]">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-[13px] font-[700] text-[var(--gold)] uppercase tracking-widest mb-2 block">Our Services</span>
            <h2 className="text-4xl font-[800] mb-4">Increase sales with our brand protection solutions</h2>
            <p className="text-[16px] text-[var(--text-body)]">Achieve comprehensive visibility of online threats with round-the-clock monitoring and enforcement.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { slug: 'content-removal', name: 'Content Removal', icon: '📄', desc: 'Remove harmful content from TikTok, Instagram, Reddit, Google and more.' },
              { slug: 'dating-reputation', name: 'Dating Reputation', icon: '🔥', desc: 'Remove damaging profiles and posts from dating sites and apps.' },
              { slug: 'job-reputation', name: 'Job Reputation', icon: '💼', desc: 'Protect your career by removing negative employment-related content.' },
              { slug: 'monitoring-alerts', name: 'Monitoring & Alerts', icon: '📊', desc: 'Real-time monitoring and alerts for threats across the internet.' },
              { slug: 'reputation-management', name: 'Reputation Management', icon: '🥇', desc: 'Comprehensive online reputation repair and enhancement.' },
              { slug: 'search-result-cleanup', name: 'Search Result Cleanup', icon: '🔍', desc: 'Remove and suppress negative search results on Google and Bing.' },
              { slug: 'reputation-audit', name: 'Reputation Audit', icon: '🔎', desc: 'Get a comprehensive audit of your online reputation and brand visibility.' },
              { slug: 'industries', name: 'Industries', icon: '🏢', desc: 'Tailored reputation management solutions for your specific industry.' },
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/${cat.slug}`} className="card-light flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block">
                  <div className="icon-box-light mb-6 text-2xl flex items-center justify-center" aria-hidden="true">
                    {cat.icon}
                  </div>
                  <h4 className="text-[18px] font-[700] text-[var(--text-heading)] mb-2">{cat.name}</h4>
                  <p className="text-[14px] text-[var(--text-body)]">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-16">
            <Link href="/contact" className="btn btn-navy-solid uppercase text-[14px] font-[600] px-8 py-3 rounded-lg">CONTACT SALES</Link>
            <Link href="/request-free-analysis" className="btn btn-gold-solid uppercase text-[14px] font-[600] px-8 py-3 rounded-lg">REQUEST A DEMO</Link>
          </div>

          {/* New Google Reviews Card */}
          <div className="flex justify-center">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 max-w-[600px] w-full flex flex-col sm:flex-row items-center sm:items-start gap-8">
              
              {/* Left Side: Rating */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} viewBox="0 0 24 24" fill="#10b981" className="w-6 h-6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <div className="text-[28px] font-[900] text-[#0f172a] leading-none mb-1">
                  4.96 <span className="text-[20px]">out 5</span>
                </div>
                <div className="text-[14px] text-gray-500 mb-4">25 Reviews</div>
                <a href="https://www.google.com/search?q=RepuKeel+reviews" target="_blank" rel="noopener noreferrer" className="bg-[#0f172a] text-white text-[12px] font-[700] px-4 py-1.5 rounded-md uppercase tracking-wide">REVIEWS</a>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-[1px] bg-gray-200 self-stretch"></div>

              {/* Right Side: Google branding */}
              <div className="flex flex-col text-center sm:text-left justify-center pt-2">
                <div className="text-[20px] font-[800] text-[#0f172a] mb-2">Google</div>
                <p className="text-[13px] text-gray-500 max-w-[250px]">Review of the Trusted Copyright Removal program</p>
              </div>

            </div>
          </div>

          {/* Trust Profile Links */}
          <TrustProfileLinks className="mt-8" />

          {/* Proof Gallery Section */}
          {proofGallery}

        </div>
      </section>

      {/* ================= 4 SIMPLE STEPS (Redesigned) ================= */}
      <section className="w-full bg-[#f4f6f8] py-24">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-[800] mb-4 text-[var(--text-heading)]">
              How We Protect You in <span className="text-[var(--gold)]">4 Simple Steps</span>
            </h2>
            <p className="text-[17px] text-gray-500">
              From your first message to full resolution &mdash; a clear, fast, and reliable process every time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center px-4">
            {[
              { n: '01', title: 'Contact Us', desc: 'Reach out with a brief description of your situation. No lengthy forms — just tell us what is happening and we take it from there.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /> },
              { n: '02', title: 'We Scan Everything', desc: 'Our AI and expert team scan hundreds of platforms to find every instance of the problem before any action is taken.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
              { n: '03', title: 'Takedowns Filed', desc: 'Notices and platform reports are filed simultaneously across all identified sources — same day, no delays.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
              { n: '04', title: 'Confirmed & Monitored', desc: 'Every removal is verified and documented. Ongoing monitoring catches any re-uploads automatically.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center group"
              >
                {/* Icon Box */}
                <div className="w-[85px] h-[85px] rounded-[24px] bg-gradient-to-br from-[#2a3547] to-[#1a2333] shadow-[0_15px_30px_rgba(0,0,0,0.15)] flex items-center justify-center mb-8 relative border-b-2 border-r-2 border-[#1a2333]/50">
                   {/* subtle inner gold glow */}
                   <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-transparent via-transparent to-[var(--gold)] opacity-30"></div>
                   <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="w-8 h-8 relative z-10">{step.icon}</svg>
                </div>
                
                {/* Large Gold Number */}
                <div className="text-[52px] font-[900] text-[var(--gold)] leading-none mb-4">{step.n}</div>
                
                {/* Title */}
                <h4 className="text-[19px] font-[800] text-[var(--text-heading)] mb-4">{step.title}</h4>
                
                {/* Description */}
                <p className="text-[14px] text-gray-500 leading-relaxed max-w-[260px] mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US (Redesigned) ================= */}
      <section className="w-full bg-[#f8f9fa] py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-[42px] font-[900] mb-6 leading-[1.1] text-[#0f172a] tracking-tight">
              Why Thousands Choose<br/>
              <span className="text-[var(--gold)]">RepuKeel</span>
            </h2>
            <p className="text-[16px] text-gray-500 mb-10 max-w-[500px] leading-relaxed">
              We are not a generic legal service or a slow law firm. We are a specialized team that moves fast, knows every platform inside out, and does not stop until the problem is fully resolved.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { title: 'Same-Day Action', desc: 'Most notices are filed within hours of receiving your case — not days or weeks.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /> },
                { title: 'Global Coverage', desc: 'We work across 150+ countries and every major platform, including the dark web.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
                { title: '100% Confidential', desc: 'Your identity and all case details are handled with strict confidentiality. We never disclose client information.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /> }
              ].map((feat, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-start gap-5">
                  <div className="w-12 h-12 rounded-[12px] bg-[rgba(217,165,43,0.1)] flex items-center justify-center text-[var(--gold)] flex-shrink-0 mt-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">{feat.icon}</svg>
                  </div>
                  <div>
                    <h4 className="text-[17px] font-[800] text-[#0f172a] mb-1">{feat.title}</h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Stats Grid) */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 lg:mt-8">
            {[
              { n: '500K+', l: 'DMCA Takedowns Filed' },
              { n: '24hrs', l: 'Avg Removal Time' },
              { n: '20+', l: 'Platforms Covered' },
              { n: '99%', l: 'Client Satisfaction' },
              { n: '150+', l: 'Countries Served' },
              { n: '7+', l: 'Years of Experience' }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-center items-center h-full min-h-[140px]">
                <div className="text-[32px] lg:text-[40px] font-[900] text-[var(--gold)] mb-2 leading-none">{stat.n}</div>
                <div className="text-[12px] font-[500] text-gray-500">{stat.l}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="w-full bg-[var(--bg-navy)] py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-[800] mb-4" style={{ color: '#ffffff' }}>Trusted by Creators Worldwide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Sarah M.', role: 'Content Creator', text: 'Absolutely incredible service. They took down stolen copies of my course videos within 24 hours. Highly recommended!' },
              { name: 'Ahmed K.', role: 'Business Owner', text: 'RepuKeel saved our brand from a fake review attack. Their team acted immediately and restored our reputation.' },
              { name: 'Jessica T.', role: 'Online Educator', text: 'I was overwhelmed by copied content across multiple platforms. RepuKeel handled everything seamlessly.' },
              { name: 'Mark D.', role: 'Brand Manager', text: 'Professional, confidential, and incredibly effective. The best investment we made for our digital security.' }
            ].map((t, i) => (
              <div key={i} className="bg-[#111a36] border border-[var(--border-navy)] rounded-2xl p-8 flex flex-col">
                <div className="flex gap-1 text-[var(--gold)] mb-6 text-lg">★★★★★</div>
                <p className="italic text-[15px] mb-8 flex-1" style={{ color: '#f4f6fb' }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center text-[var(--bg-navy)] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-[700]" style={{ color: '#ffffff' }}>{t.name}</h4>
                    <p className="text-[12px]" style={{ color: '#9aa4c0' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ (Redesigned) ================= */}
      <section className="w-full bg-white py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-[52px] font-[900] mb-6 leading-[1.05] text-[#0f172a] tracking-tight">
              Got Questions? <span className="text-[var(--gold)] block">We Have Answers.</span>
            </h2>
            
            <p className="text-[17px] text-gray-500 mb-10 max-w-[450px] leading-relaxed">
              Most people come to us with questions before they commit. Here are the ones we hear most often.
            </p>
            
            <ul className="flex flex-col gap-5 mb-12">
              {[
                '24/7 Support Available',
                'Free initial consultation',
                'No long-term commitment required',
                'Results-driven pricing'
              ].map((chk, i) => (
                <li key={i} className="flex items-center gap-4 text-[16px] text-gray-600 font-[400]">
                  <div className="w-6 h-6 rounded-full border border-[var(--gold)] flex items-center justify-center text-[var(--gold)] flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  {chk}
                </li>
              ))}
            </ul>
            
            <div>
              <Link href="/contact" className="inline-flex items-center gap-3 bg-[#0a1128] text-white px-8 py-3.5 rounded-[12px] font-[700] text-[15px] hover:bg-[#1a233a] transition-colors shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                Contact Our Team
              </Link>
            </div>
          </div>

          {/* Right Column (FAQ Cards) */}
          <div className="flex flex-col gap-4">
            {[
              { q: 'What is a DMCA takedown?', a: <span>A <Link href="/protection" className="text-[var(--gold)] hover:underline font-semibold">DMCA takedown</Link> is a formal legal notice filed with a platform or hosting provider under the Digital Millennium Copyright Act, requiring them to remove content that infringes your copyright. Most major platforms globally comply with DMCA notices.</span> },
              { q: 'How quickly does content get removed?', a: 'Most content is removed within 24 to 72 hours of a valid notice being filed. Search engine de-indexing takes 24 to 96 hours. We track every case until it is fully resolved.' },
              { q: 'Do you handle reputation damage as well as copyright?', a: <span>Yes. We offer full <Link href="/reputation-management" className="text-[var(--gold)] hover:underline font-semibold">online reputation management</Link> services including removal of defamatory articles, fake review campaigns, and negative content suppression alongside our copyright enforcement services.</span> },
              { q: 'Is your service confidential?', a: 'Completely. Your identity and all case details are handled with strict confidentiality. We never share our client list publicly without explicit permission.' }
            ].map((faq, i) => (
              <div key={i} className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-8">
                <h4 className="text-[16px] font-[800] text-[#0f172a] mb-3">{faq.q}</h4>
                <p className="text-[14.5px] text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= LATEST ARTICLES ================= */}
      <section className="w-full bg-[#f4f6f8] py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[13px] font-[700] text-[var(--gold)] uppercase tracking-widest mb-2 block">From Our Blog</span>
            <h2 className="text-4xl font-[800] mb-4 text-[var(--text-heading)]">Latest Articles</h2>
            <p className="text-[16px] text-[var(--text-body)]">Expert guides on reputation management, DMCA takedowns, and brand protection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'How to Remove Fake Google Reviews: A Complete Guide by RepuKeel', slug: 'remove-fake-google-reviews', category: 'Reviews', excerpt: 'Fake Google reviews hurting your business? Learn how to remove them legally and fast.' },
              { title: 'Online Reputation Management: How RepuKeel Helps You Remove Bad Reviews and Protect Your Brand', slug: 'online-reputation-management-guide', category: 'Reputation Management', excerpt: 'A single bad review can cost you customers. Learn how online reputation management works.' },
              { title: 'DMCA Takedown Claims Explained: How to Remove Stolen Content Online', slug: 'dmca-takedown-claims-guide', category: 'DMCA', excerpt: 'Someone using your content without permission? Learn how DMCA takedowns work.' },
            ].map((post, i) => (
              <Link
                key={i}
                href={`/blogs/${post.slug}`}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group no-underline block"
              >
                <div className="text-[12px] font-[700] text-[var(--gold)] uppercase tracking-wider mb-2">{post.category}</div>
                <h3 className="text-[17px] font-[800] text-[var(--text-heading)] mb-3 group-hover:text-[var(--gold)] transition-colors">{post.title}</h3>
                <p className="text-[14px] text-[var(--text-body)] mb-4">{post.excerpt}</p>
                <span className="text-[13px] font-[700] text-[var(--bg-navy)] group-hover:text-[var(--gold)] transition-colors">Read article &rarr;</span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/blogs" className="btn btn-outline-dark text-[14px] font-[600] px-8 py-3 rounded-lg inline-block">View All Articles</Link>
          </div>
        </div>
      </section>

      {/* ================= EXPLORE MORE ================= */}
      <section className="w-full bg-white py-20 border-t border-[var(--border-light)]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-[800] mb-4 text-[var(--text-heading)]">Explore More</h2>
            <p className="text-[16px] text-[var(--text-body)]">Transparent pricing, proven results, and free tools to help you take control of your online presence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/pricing" className="card-light flex flex-col items-center text-center p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-3xl mb-4">💰</div>
              <h4 className="text-[18px] font-[700] text-[var(--text-heading)] mb-2">Pricing</h4>
              <p className="text-[14px] text-[var(--text-body)]">Transparent, results-driven pricing with no hidden fees.</p>
            </Link>
            <Link href="/case-studies" className="card-light flex flex-col items-center text-center p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-3xl mb-4">📊</div>
              <h4 className="text-[18px] font-[700] text-[var(--text-heading)] mb-2">Case Studies</h4>
              <p className="text-[14px] text-[var(--text-body)]">Real results from real clients — see how we deliver.</p>
            </Link>
            <Link href="/tools" className="card-light flex flex-col items-center text-center p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-3xl mb-4">🛠️</div>
              <h4 className="text-[18px] font-[700] text-[var(--text-heading)] mb-2">Free Tools</h4>
              <p className="text-[14px] text-[var(--text-body)]">Search tools, image fingerprinting, and more — all free.</p>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
