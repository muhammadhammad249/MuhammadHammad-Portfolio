/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getCurrentProfile, STATUS_LABELS } from '@/lib/auth';

const STATUS_FILTERS = ['All', 'submitted', 'under_review', 'in_progress', 'awaiting_client_action', 'completed', 'closed'];

export default function MyCasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const profile = await getCurrentProfile();
        if (profile) {
          const { data } = await supabase
            .from('cases')
            .select('*')
            .eq('client_id', profile.id)
            .order('created_at', { ascending: false });

          setCases(data || []);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filter === 'All' ? cases : cases.filter((c) => c.status === filter);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[26px] font-[800] text-[#0a192f]">My Cases</h1>
        <p className="text-gray-500 text-[15px] mt-1">{cases.length} total cases</p>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-[700] transition-all border ${
              filter === s
                ? 'bg-[#0c1940] text-white border-[#0c1940]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
            }`}
          >
            {s === 'All' ? 'All' : (STATUS_LABELS[s]?.label || s)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <svg className="animate-spin h-8 w-8 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-20 text-center">
          <div className="text-[48px] mb-4">📭</div>
          <p className="text-[17px] font-[700] text-gray-800 mb-2">No cases found</p>
          <p className="text-[14px] text-gray-500 mb-6">
            {filter === 'All' ? "You haven't submitted any cases yet." : `No cases with status "${STATUS_LABELS[filter]?.label || filter}".`}
          </p>
          {filter === 'All' && (
            <Link href="/dashboard/new-inquiry" className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#c19b2e] text-white font-[700] text-[14px] px-5 py-3 rounded-xl transition-colors">
              Submit Your First Inquiry
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Case ID</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Urgency</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const statusInfo = STATUS_LABELS[c.status] || { label: c.status, color: 'bg-gray-100 text-gray-700' };
                  return (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => router.push(`/dashboard/cases/${c.id}`)}>
                      <td className="py-4 px-6 text-[14px] font-[800] text-[#0a192f]">{c.case_id}</td>
                      <td className="py-4 px-6 text-[14px] text-gray-700 max-w-[200px] truncate">{c.service_type}</td>
                      <td className="py-4 px-6">
                        <span className={`text-[12px] font-[700] capitalize ${
                          c.urgency === 'emergency' ? 'text-red-600' : c.urgency === 'urgent' ? 'text-orange-500' : 'text-green-600'
                        }`}>
                          {c.urgency || 'normal'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-[700] ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[13px] text-gray-400">
                        {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-6">
                        <Link href={`/dashboard/cases/${c.id}`} className="text-[13px] font-[700] text-[#d4af37] hover:underline whitespace-nowrap">
                          Open →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
