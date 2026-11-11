/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      // Get all clients (profiles where role = client)
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false });

      // Count cases per client manually or using a view. 
      // For simplicity, we just fetch all cases and group them by client.
      const { data: cases } = await supabase.from('cases').select('client_id');
      
      const counts: Record<string, number> = {};
      cases?.forEach(c => {
        counts[c.client_id] = (counts[c.client_id] || 0) + 1;
      });

      const clientsWithCounts = (profiles || []).map(p => ({
        ...p,
        case_count: counts[p.id] || 0
      }));

      setClients(clientsWithCounts);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = clients.filter((c) => {
    return !search || 
      c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.whatsapp?.includes(search);
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[26px] font-[800] text-[#0a192f]">Clients Directory</h1>
          <p className="text-gray-500 text-[15px] mt-1">{filtered.length} registered clients</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or WhatsApp..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#d4af37] transition-all shadow-sm"
          />
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
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Client Name</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Email Address</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">WhatsApp / Phone</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider text-center">Cases</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="py-16 text-center text-gray-400 text-[14px]">No clients found.</td></tr>
                ) : filtered.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-[14px] font-[800] text-[#0a192f] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[12px]">
                        {c.full_name?.charAt(0)?.toUpperCase() || 'C'}
                      </div>
                      {c.full_name}
                    </td>
                    <td className="py-4 px-6 text-[14px] text-gray-600">{c.email}</td>
                    <td className="py-4 px-6 text-[14px] text-gray-600 font-mono text-[13px]">{c.whatsapp || '—'}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-[12px] font-[700]">
                        {c.case_count}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-400">{new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
