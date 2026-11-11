/* eslint-disable */

export default function ClientsPage() {
  const testimonials = [
    { text: "RepuKeel resolved our copyright issue within 48 hours. Incredibly professional and effective. I had no idea how many sites had stolen my content.", name: "Sarah J.", role: "Independent Creator" },
    { text: "Our brand was being impersonated on three platforms. The team handled everything swiftly and set up monitoring so it never happens again.", name: "Marcus T.", role: "CMO, Tech Startup" },
    { text: "My entire course was being shared freely on Telegram. Within 30 days the situation was almost completely resolved. Truly a lifesaver.", name: "Dr. Elena R.", role: "Online Educator" },
    { text: "Professional, responsive, and delivered exactly what they promised. The process was transparent throughout. Highly recommended.", name: "James K.", role: "Software Developer" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0a192f] font-sans pb-24">
      {/* Header */}
      <div className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <p className="text-xs font-bold text-[#e0ac2f] uppercase tracking-[2px] mb-3">Our Clients</p>
        <h1 className="text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.2] mb-6 text-[#0a192f]">Trusted by 200+ Creators &amp; Brands</h1>
        <p className="text-[15px] text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Real results from real people. Here is what clients have said about working with RepuKeel.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-8 md:p-10 hover:border-[#e0ac2f] transition-colors duration-300 shadow-sm">
               <div className="flex text-[#22c55e] text-lg mb-4">
                  ★★★★★
               </div>
               <blockquote className="text-[15px] text-gray-700 leading-relaxed mb-6 italic">
                 &ldquo;{test.text}&rdquo;
               </blockquote>
               <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                 <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-[#e0ac2f] shadow-sm">
                    {test.name.charAt(0)}
                 </div>
                 <div>
                    <p className="font-bold text-sm text-[#0a192f]">{test.name}</p>
                    <p className="text-xs text-gray-500">{test.role}</p>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 text-center">
        <div className="bg-[#0a192f] border border-[#1a2a4a] rounded-2xl p-10 shadow-xl">
           <h2 className="text-2xl font-bold mb-4 text-white">Join the Protected</h2>
           <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
             Don&apos;t let pirates profit from your hard work. Get started today and secure your intellectual property.
           </p>
           <a href="/protection" className="bg-[#e0ac2f] hover:bg-[#f2c94c] text-[#12100a] font-bold text-sm px-8 py-3 rounded-md transition-colors shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
             Get Protection Now
           </a>
        </div>
      </div>
    </div>
  );
}
