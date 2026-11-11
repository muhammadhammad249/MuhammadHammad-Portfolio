/* eslint-disable */
'use client';
import { useState } from 'react';
import Link from 'next/link';
import BlueCtaBand from '../components/BlueCtaBand';

const SERVICES = [
  { id: 1, name: 'Personal Reputation Audit', price: '$497', timeframe: '48–72 hours', type: 'Official' },
  { id: 2, name: 'Wikipedia Notability Assessment', price: 'Free', timeframe: '5 business days', type: 'Official' },
  { id: 3, name: 'Wikipedia Page Creation', price: '$4,995', timeframe: 'Contact for timeframe', type: 'Official' },
  { id: 4, name: 'Wikipedia Press Foundation Building', price: '$3,000–$10,000', timeframe: '6–12 months', type: 'Estimated' },
  { id: 5, name: 'Google Text Review Removal', price: '$1,000/review', timeframe: '3–7 days', type: 'Official' },
  { id: 6, name: 'Google Image Review Removal', price: '$750/review', timeframe: 'Up to 7 days', type: 'Official' },
  { id: 7, name: 'Yelp Review Removal', price: '$1,250/review', timeframe: 'Up to 30 days', type: 'Official' },
  { id: 8, name: 'Fake Review Removal', price: '$500–$1,500/review', timeframe: '3–14 days', type: 'Estimated' },
  { id: 9, name: 'BBB Review & Complaint Removal', price: '$750–$2,500', timeframe: '1–4 weeks', type: 'Estimated' },
  { id: 10, name: 'Travel Review Removal', price: '$500–$1,500/review', timeframe: '3–30 days', type: 'Estimated' },
  { id: 11, name: 'TikTok Content Removal', price: '$750–$2,500', timeframe: '3–14 days', type: 'Estimated' },
  { id: 12, name: 'Instagram Content Removal', price: '$500–$2,000', timeframe: '3–14 days', type: 'Estimated' },
  { id: 13, name: 'X/Twitter Content Removal', price: '$500–$2,000', timeframe: '3–14 days', type: 'Estimated' },
  { id: 14, name: 'Reddit Content Removal', price: '$750–$2,500', timeframe: '3–21 days', type: 'Estimated' },
  { id: 15, name: 'Facebook/AWDTSG Content Removal', price: '$750–$2,500', timeframe: '~72 hours–2 weeks', type: 'Estimated' },
  { id: 16, name: 'Mugshot Removal', price: '$1,000–$3,000', timeframe: '1–4 weeks', type: 'Estimated' },
  { id: 17, name: 'Defamatory Content Removal', price: '$1,000–$5,000+', timeframe: '1–6 weeks', type: 'Estimated' },
  { id: 18, name: 'News Article Removal', price: '$2,000–$10,000+', timeframe: '2–12 weeks', type: 'Estimated' },
  { id: 19, name: 'Forum/Gossip Content Removal', price: '$750–$3,000', timeframe: '1–4 weeks', type: 'Estimated' },
  { id: 20, name: 'Dating App Image/Profile Removal', price: '$500–$2,000', timeframe: '3–14 days', type: 'Estimated' },
  { id: 21, name: 'YouTube Content Removal', price: '$750–$3,000', timeframe: '3–21 days', type: 'Estimated' },
  { id: 22, name: 'Quora Content Removal', price: '$500–$2,000', timeframe: '3–21 days', type: 'Estimated' },
  { id: 23, name: 'Search Engine Content Removal', price: '$1,000–$5,000', timeframe: '2–8 weeks', type: 'Estimated' },
  { id: 24, name: 'AWDTSG Removal', price: '$750–$2,500', timeframe: '~72 hours', type: 'Estimated' },
  { id: 25, name: 'Tea App Search', price: '$149.99', timeframe: '24 hours', type: 'Official' },
  { id: 26, name: 'Tea App Post Removal', price: '$750', timeframe: '3–14 days', type: 'Official price' },
  { id: 27, name: 'Professional Reputation Management', price: '$999 / 30 days', timeframe: '30 days', type: 'Official' },
  { id: 28, name: 'Job Reputation Management', price: '$1,500–$5,000/month', timeframe: 'Several weeks–months', type: 'Estimated' },
  { id: 29, name: 'LinkedIn Profile Optimization', price: '$500–$1,500', timeframe: '3–10 days', type: 'Estimated' },
  { id: 30, name: 'Background-Check Reputation Cleanup', price: '$1,500–$5,000', timeframe: '2–8 weeks', type: 'Estimated' },
  { id: 31, name: 'Search Result Cleanup', price: '$1,500–$5,000/month', timeframe: '30–90 days', type: 'Estimated' },
  { id: 32, name: 'Google Search Suppression', price: '$1,500–$5,000/month', timeframe: '30–90 days', type: 'Estimated' },
  { id: 33, name: 'Google Autocomplete Cleanup', price: '$1,000–$3,500', timeframe: '2–8 weeks', type: 'Estimated' },
  { id: 34, name: 'Reddit Search Suppression', price: '$1,000–$3,500/month', timeframe: '30–90 days', type: 'Estimated' },
  { id: 35, name: 'YouTube Search Suppression', price: '$1,500–$4,000/month', timeframe: '30–90 days', type: 'Estimated' },
  { id: 36, name: 'Search Engine De-indexing', price: '$750–$3,000', timeframe: '1–6 weeks', type: 'Estimated' },
  { id: 37, name: 'AWDTSG Monitoring & Alerts', price: '$200–$750/month', timeframe: 'Ongoing', type: 'Estimated' },
  { id: 38, name: 'Social Media Reputation Monitoring', price: '$200–$1,000/month', timeframe: 'Ongoing', type: 'Estimated' },
  { id: 39, name: 'Dark Web & Data Leak Monitoring', price: '$300–$1,500/month', timeframe: 'Ongoing', type: 'Estimated' },
  { id: 40, name: 'Employer & Workplace Risk Tracking', price: '$300–$1,500/month', timeframe: 'Ongoing', type: 'Estimated' },
  { id: 41, name: 'Monthly Snapshot Reports', price: '$200–$750/month', timeframe: 'Monthly', type: 'Estimated' },
  { id: 42, name: 'Reputation Monitoring & Alerts', price: '$250–$1,000/month', timeframe: '24/7 ongoing', type: 'Estimated' },
  { id: 43, name: 'Online Reputation Management', price: '$1,500–$5,000/month', timeframe: '30–90 days+', type: 'Estimated' },
  { id: 44, name: 'Dating Reputation Management', price: '$1,000–$4,000/month', timeframe: '30–90 days+', type: 'Estimated' },
  { id: 45, name: 'Dating Reputation Monitoring', price: '$200–$750/month', timeframe: 'Ongoing', type: 'Estimated' },
  { id: 46, name: 'Job Reputation Protection', price: '$500–$2,000/month', timeframe: 'Ongoing', type: 'Estimated' },
  { id: 47, name: 'Reputation Audit', price: 'From $297', timeframe: 'Contact for timeframe', type: 'Official' },
  { id: 48, name: 'Industry-Specific Reputation Management', price: '$1,500–$7,500/month', timeframe: '30–90 days+', type: 'Estimated' },
];

export default function PricingPage() {
  const [search, setSearch] = useState('');
  const filtered = SERVICES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">

      {/* Hero */}
      <section className="relative w-full bg-[#0a192f] pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-20 left-[20%] w-1.5 h-1.5 rounded-full bg-[#d4af37] opacity-50 shadow-[0_0_8px_#d4af37]"></div>
        <div className="absolute top-40 right-[30%] w-1.5 h-1.5 rounded-full bg-[#d4af37] opacity-70 shadow-[0_0_8px_#d4af37] animate-pulse"></div>
        <div className="absolute bottom-32 left-[10%] w-2 h-2 rounded-full bg-[#d4af37] opacity-40 shadow-[0_0_10px_#d4af37]"></div>

        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 border border-[#d4af37]/40 text-[#d4af37] text-[13px] font-[700] px-4 py-1.5 rounded-full">
            💳 Service Pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-[900] tracking-tight mb-4 text-white">
            Transparent Pricing
          </h1>
          <p className="text-[18px] font-[600] mb-4 text-[#d4af37]">No hidden fees. Total protection.</p>
          <p className="text-[15px] text-gray-400 max-w-xl mx-auto">
            All 48 services listed with clear prices and timeframes. Prices marked <span className="text-[#d4af37] font-semibold">Official</span> are fixed; <span className="text-gray-300 font-semibold">Estimated</span> prices vary by case complexity.
          </p>
        </div>
      </section>

      {/* Notice */}
      <div className="w-full bg-[#d4af37]/10 border-b border-[#d4af37]/30 py-3 px-6 text-center text-[13px] text-[#0a192f] font-[500]">
        💬 All estimates require a free case review. &nbsp;
        <a href="/contact" className="text-[#d4af37] font-bold hover:underline">Get a custom quote →</a>
      </div>

      {/* Search + Table */}
      <section className="flex-1 w-full py-16 px-4">
        <div className="max-w-[1100px] mx-auto">

          {/* Search bar */}
          <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
            <div className="text-[#0a192f] font-[700] text-[18px]">
              All Services <span className="text-gray-400 font-[400] text-[14px] ml-2">({SERVICES.length} total)</span>
            </div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] w-[260px] focus:outline-none focus:border-[#d4af37] shadow-sm"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-[14px] border-collapse">
              <thead>
                <tr className="bg-[#0a192f] text-white">
                  <th className="text-left px-4 py-4 font-[700] w-12">#</th>
                  <th className="text-left px-4 py-4 font-[700]">Service</th>
                  <th className="text-left px-4 py-4 font-[700]">Price (USD)</th>
                  <th className="text-left px-4 py-4 font-[700]">Timeframe</th>
                  <th className="text-left px-4 py-4 font-[700]">Price Type</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400">No services match your search.</td>
                  </tr>
                ) : (
                  filtered.map((s, i) => (
                    <tr
                      key={s.id}
                      className={`border-t border-gray-100 hover:bg-[#fffbf0] transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}
                    >
                      <td className="px-4 py-3.5 text-gray-400 font-[600]">{s.id}</td>
                      <td className="px-4 py-3.5 font-[600] text-[#0a192f]">{s.name}</td>
                      <td className="px-4 py-3.5 font-[700] text-[#0a192f]">{s.price}</td>
                      <td className="px-4 py-3.5 text-gray-600">{s.timeframe}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-block text-[12px] font-[700] px-2.5 py-0.5 rounded-full ${
                          s.type === 'Official'
                            ? 'bg-[#d4af37]/15 text-[#9a7c1f]'
                            : s.type === 'Official price'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {s.type}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-[13px]">
            <div className="flex items-center gap-2">
              <span className="inline-block bg-[#d4af37]/15 text-[#9a7c1f] text-[12px] font-[700] px-2.5 py-0.5 rounded-full">Official</span>
              <span className="text-gray-500">Fixed, published rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block bg-gray-100 text-gray-600 text-[12px] font-[700] px-2.5 py-0.5 rounded-full">Estimated</span>
              <span className="text-gray-500">Varies by case — free quote available</span>
            </div>
          </div>

          {/* FAQ + CTA */}
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-8">
              <h3 className="text-[18px] font-[800] text-[#0a192f] mb-4">Payment Methods</h3>
              <ul className="space-y-3 text-[14px] text-gray-600">
                {['Western Union', 'Remitly', 'Cryptocurrency'].map(m => (
                  <li key={m} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">✓</span>
                    {m}
                  </li>
                ))}
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">✕</span>
                  Cards / PayPal (not accepted)
                </li>
              </ul>
            </div>

            <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-8">
              <h3 className="text-[18px] font-[800] text-[#0a192f] mb-3">Not sure which service you need?</h3>
              <p className="text-gray-500 text-[14px] mb-6">
                Get a free case review. We will assess your situation and recommend the right approach with a custom quote.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/request-free-analysis" className="bg-[#0a192f] hover:bg-[#1a2a4a] text-white font-bold px-6 py-3 rounded-xl transition-colors text-[14px] text-center">
                  Request Free Analysis
                </Link>
                <Link href="/contact" className="border border-gray-300 hover:border-[#d4af37] text-[#0a192f] font-semibold px-6 py-3 rounded-xl transition-colors text-[14px] text-center">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlueCtaBand
        headingWhite="Ready to Protect Your"
        headingGold="Reputation?"
        subtext="Get a free case review. We will assess your situation, confirm what is eligible, and send a custom quote within 24 hours."
        primaryBtnText="Request Free Analysis"
        primaryBtnLink="/request-free-analysis"
        secondaryBtnText="Contact Us"
        secondaryBtnLink="/contact"
      />
    </div>
  );
}