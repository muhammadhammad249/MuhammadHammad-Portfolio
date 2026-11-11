import { categories } from '@/data/services';

export default function RequestFreeAnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-green-600 bg-green-100 rounded-full">100% Free · No Obligation</span>
        <h1 className="text-5xl font-extrabold mb-6">Request Your Free Analysis</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Tell us about your situation and our experts will assess the threat and outline a clear action plan — completely free of charge.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["No Obligation", "Free of Charge", "Response Within 24h", "Expert Analysis"].map((b) => (
          <div key={b} className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <span>✓</span><span>{b}</span>
          </div>
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-lg">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
              <input type="email" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Website or Brand Name</label>
            <input type="text" placeholder="e.g. yourcompany.com or Your Brand Name" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Type of Issue <span className="text-red-500">*</span></label>
            <select className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select your issue type...</option>
              {categories.map((category) => (
                <optgroup key={category.slug} label={category.name}>
                  {category.subServices.map((sub) => (
                    <option key={sub.slug} value={sub.name}>{sub.name}</option>
                  ))}
                </optgroup>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Describe Your Situation <span className="text-red-500">*</span></label>
            <textarea rows={5} placeholder="Please describe what happened, where the content is appearing, and any relevant details..." className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">URL <span className="text-slate-400 font-normal">(optional)</span></label>
            <textarea rows={3} placeholder="Paste any URLs where the infringing content appears, one per line..." className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
            Submit Free Analysis Request →
          </button>
          <p className="text-xs text-slate-400 text-center">We typically respond within 24 hours. Your information is kept strictly confidential.</p>
        </div>
      </div>
    </div>
  );
}
