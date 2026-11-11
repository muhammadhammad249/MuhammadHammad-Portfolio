/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getCurrentProfile } from '@/lib/auth';

export default function AdminActivityLogPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const profile = await getCurrentProfile();
      if (!profile || profile.role !== 'super_admin') {
        router.push('/dashboard/admin'); // Only super admins can view this
        return;
      }

      // Fetch logs
      const { data } = await supabase
        .from('activity_log')
        .select('*, profiles(full_name, email)')
        .order('created_at', { ascending: false })
        .limit(100);

      setLogs(data || []);
      setLoading(false);
    }
    load();
  }, [router]);

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
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[26px] font-[800] text-[#0a192f] flex items-center gap-3">
          Activity Log
          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-wider font-[800]">Super Admin</span>
        </h1>
        <p className="text-gray-500 text-[15px] mt-1">Audit trail of important actions taken across the portal.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Date & Time</th>
                <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Admin</th>
                <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Action</th>
                <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Target</th>
                <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr><td colSpan={5} className="py-16 text-center text-gray-400 text-[14px]">No activity logs found.</td></tr>
              ) : logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-[13px] text-gray-500 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-[14px] font-[700] text-[#0a192f]">{log.profiles?.full_name || 'Unknown'}</p>
                    <p className="text-[12px] text-gray-400">{log.profiles?.email}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-[700] bg-blue-50 text-blue-700 capitalize">
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-gray-700 capitalize">
                    {log.target_type}
                    {log.target_id && <span className="block text-[11px] font-mono text-gray-400 mt-1">{log.target_id.split('-')[0]}...</span>}
                  </td>
                  <td className="py-4 px-6 text-[13px] text-gray-600">
                    <pre className="whitespace-pre-wrap font-sans bg-gray-50 p-2 rounded-lg text-[12px] border border-gray-100 max-w-xs overflow-x-auto">
                      {log.details ? JSON.stringify(log.details, null, 2) : '—'}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
