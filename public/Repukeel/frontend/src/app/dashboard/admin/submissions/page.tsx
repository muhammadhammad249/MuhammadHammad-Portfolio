/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { STATUS_LABELS } from '@/lib/auth';

export default function AdminSubmissionsPage() {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    async function loadCases() {
      const { data } = await supabase
        .from('cases')
        .select('id, case_id, service_type, status, urgency, created_at')
        .order('created_at', { ascending: false });
        
      setCases(data || []);
    }
    loadCases();

    // Subscribe to realtime changes
    const channel = supabase.channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cases' }, () => {
        loadCases();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-32 min-h-[75vh]">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-3">All Submissions</h1>
          <p className="text-slate-500 text-lg">View all contact, analysis, and case submissions.</p>
        </div>
      </div>
      
      <div className="space-y-8">
        


        {/* Analysis Requests */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Analysis Requests</h2>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center text-slate-400">
            <p className="text-lg">No analysis requests yet.</p>
          </div>
        </div>

        {/* Protection Cases (Real Time) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Protection Cases</h2>
          
          {cases.length === 0 ? (
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center text-slate-400">
              <p className="text-lg">No protection cases yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-600">Case ID</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-600">Client</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-600">Service</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((c) => {
                    const statusInfo = STATUS_LABELS[c.status] || { label: c.status, color: 'bg-gray-100 text-gray-700' };
                    const client = (c.profiles as any);
                    return (
                      <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-800">{c.case_id}</td>
                        <td className="py-4 px-6">
                          <p className="font-semibold text-slate-800">{client?.full_name || '�'}</p>
                          <p className="text-sm text-slate-500">{client?.email || ''}</p>
                        </td>
                        <td className="py-4 px-6 text-slate-600">{c.service_type}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-500 text-sm">
                          {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
    </div>
  );
}
