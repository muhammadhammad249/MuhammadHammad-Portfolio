/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getCurrentProfile, STATUS_LABELS } from '@/lib/auth';

interface Case {
  id: string;
  case_id: string;
  service_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function DashboardOverview() {
  const [cases, setCases] = useState<Case[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const p = await getCurrentProfile();
        setProfile(p);

        if (p) {
          const { data: cData } = await supabase
            .from('cases')
            .select('id, case_id, service_type, status, created_at, updated_at')
            .eq('client_id', p.id)
            .order('created_at', { ascending: false });
          
          setCases(cData || []);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const active = cases.filter((c) => !['completed', 'closed'].includes(c.status)).length;
  const awaiting = cases.filter((c) => c.status === 'awaiting_client_action').length;
  const completed = cases.filter((c) => c.status === 'completed').length;

  const stats = [
    { label: 'Active Cases', value: active, icon: '🔵', color: 'bg-blue-50 border-blue-100', valueColor: 'text-blue-700' },
    { label: 'Awaiting Your Action', value: awaiting, icon: '🟠', color: 'bg-orange-50 border-orange-100', valueColor: 'text-orange-700' },
    { label: 'Completed', value: completed, icon: '🟢', color: 'bg-green-50 border-green-100', valueColor: 'text-green-700' },
    { label: 'Total Cases', value: cases.length, icon: '📁', color: 'bg-gray-50 border-gray-100', valueColor: 'text-gray-700' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-8 w-8 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[26px] font-[800] text-[#0a192f]">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'Client'} 👋
        </h1>
        <p className="text-gray-500 text-[15px] mt-1">Here's an overview of your cases and activity.</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/dashboard/new-inquiry"
          className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#c19b2e] text-white font-[700] text-[14px] px-5 py-3 rounded-xl transition-colors shadow-sm"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>
          Submit New Inquiry
        </Link>
        <Link
          href="/dashboard/cases"
          className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#0a192f] font-[700] text-[14px] px-5 py-3 rounded-xl transition-colors shadow-sm border border-gray-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round"/></svg>
          Track Cases
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className={`bg-white border rounded-2xl p-5 ${s.color}`}>
            <div className="text-[22px] mb-3">{s.icon}</div>
            <div className={`text-[32px] font-[900] mb-1 ${s.valueColor}`}>{s.value}</div>
            <div className="text-[13px] text-gray-500 font-[600]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[17px] font-[800] text-[#0a192f]">Recent Cases</h2>
          <Link href="/dashboard/cases" className="text-[13px] font-[700] text-[#d4af37] hover:underline">View All</Link>
        </div>

        {cases.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-[48px] mb-4">📭</div>
            <p className="text-[17px] font-[700] text-gray-800 mb-2">No cases yet</p>
            <p className="text-[14px] text-gray-500 mb-6">Submit your first inquiry and we'll create a case for you.</p>
            <Link
              href="/dashboard/new-inquiry"
              className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#c19b2e] text-white font-[700] text-[14px] px-5 py-3 rounded-xl transition-colors"
            >
              Submit Inquiry
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-500 uppercase tracking-wider">Case ID</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c) => {
                  const statusInfo = STATUS_LABELS[c.status] || { label: c.status, color: 'bg-gray-100 text-gray-700' };
                  return (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => router.push(`/dashboard/cases/${c.id}`)}>
                      <td className="py-4 px-6 text-[14px] font-[700] text-[#0a192f]">{c.case_id}</td>
                      <td className="py-4 px-6 text-[14px] text-gray-600">{c.service_type}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-[700] ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[13px] text-gray-400">
                        {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-6">
                        <Link href={`/dashboard/cases/${c.id}`} className="text-[13px] font-[700] text-[#d4af37] hover:underline">
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
