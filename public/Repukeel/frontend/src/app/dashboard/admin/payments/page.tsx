/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminPaymentsPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('invoices')
        .select('*, cases(case_id, profiles:profiles!client_id(full_name, email))')
        .order('created_at', { ascending: false });

      setInvoices(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.status === 'confirmed' ? Number(inv.amount) : 0), 0);
  const pendingRevenue = invoices.reduce((sum, inv) => sum + (inv.status !== 'confirmed' ? Number(inv.amount) : 0), 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[26px] font-[800] text-[#0a192f]">Payments & Invoices</h1>
          <p className="text-gray-500 text-[15px] mt-1">Manage billing and verify payment proofs.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border rounded-2xl p-5 border-green-100 shadow-sm">
          <div className="text-[13px] font-[700] text-gray-500 uppercase tracking-wider mb-2">Total Confirmed</div>
          <div className="text-[28px] font-[900] text-green-600">${totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-white border rounded-2xl p-5 border-yellow-100 shadow-sm">
          <div className="text-[13px] font-[700] text-gray-500 uppercase tracking-wider mb-2">Pending / Submitted</div>
          <div className="text-[28px] font-[900] text-yellow-600">${pendingRevenue.toLocaleString()}</div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <svg className="animate-spin h-8 w-8 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Case & Client</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Method & Ref</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.length === 0 ? (
                  <tr><td colSpan={6} className="py-16 text-center text-gray-400 text-[14px]">No invoices found.</td></tr>
                ) : invoices.map((inv) => {
                  const c = inv.cases as any;
                  const client = c?.profiles;
                  return (
                    <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-[16px] font-[800] text-[#0a192f]">${inv.amount} <span className="text-[12px] text-gray-400">{inv.currency}</span></td>
                      <td className="py-4 px-6">
                        <Link href={`/dashboard/admin/cases/${inv.case_id}`} className="text-[13px] font-[800] text-[#d4af37] hover:underline block mb-0.5">
                          {c?.case_id}
                        </Link>
                        <span className="text-[12px] text-gray-500">{client?.full_name}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-[700] ${
                          inv.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          inv.status === 'submitted' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-[13px] font-[600] text-gray-800 capitalize">{inv.payment_method || '—'}</p>
                        {inv.payment_reference && <p className="text-[11px] font-mono text-gray-500 mt-1">{inv.payment_reference}</p>}
                      </td>
                      <td className="py-4 px-6 text-[13px] text-gray-400">{new Date(inv.created_at).toLocaleDateString()}</td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/dashboard/admin/cases/${inv.case_id}`} className="text-[13px] font-[700] text-blue-600 hover:underline">Verify →</Link>
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
