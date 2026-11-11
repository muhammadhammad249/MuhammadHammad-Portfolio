'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/services';

export default function NewCasePage() {
  const router = useRouter();
  const [issueType, setIssueType] = useState('Content Removal');
  const [description, setDescription] = useState('');
  const [urls, setUrls] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!description) {
      setError('Please provide a case description.');
      return;
    }

    setLoading(true);
    // Simulate submission delay
    setTimeout(() => {
      setLoading(false);
      // Dummy action
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <Link href="/dashboard" className="text-blue-600 hover:underline text-sm mb-8 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-3xl font-bold mb-2">Submit New Case</h1>
      <p className="text-slate-500 mb-8">Provide details about the infringement and our team will begin processing immediately.</p>
      
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Issue Type <span className="text-red-500">*</span></label>
          <select 
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="" disabled>Select an issue type...</option>
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
          <label className="block text-sm font-semibold text-slate-700 mb-2">Case Description <span className="text-red-500">*</span></label>
          <textarea 
            rows={5} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the infringement in detail..." 
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">URL <span className="text-slate-400 font-normal">(optional)</span></label>
          <textarea 
            rows={4} 
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="Paste URLs, one per line..." 
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : 'Submit Case →'}
        </button>
      </form>
    </div>
  );
}
