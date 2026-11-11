/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// ─── Confirmation Modal ───────────────────────────────────────────────────────
function DeleteModal({
  caseId: _caseId,
  caseLabel,
  onCancel,
  onConfirm,
  isDeleting,
}: {
  caseId: string;
  caseLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-red-600">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-[18px] font-[800] text-[#0a192f]">Delete Case?</h3>
            <p className="text-[13px] text-gray-500 mt-0.5">Case <strong>{caseLabel}</strong></p>
          </div>
        </div>
        <p className="text-[14px] text-gray-600 mb-8 leading-relaxed">
          This will permanently delete this case along with all its updates, messages, and invoices. <strong>This action cannot be undone.</strong>
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 h-[46px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-[700] text-[14px] rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 h-[46px] bg-red-600 hover:bg-red-700 text-white font-[700] text-[14px] rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            )}
            {isDeleting ? 'Deleting...' : 'Delete Case'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalCases: 0, submitted: 0, inProgress: 0, completed: 0 });
  const [recentCases, setRecentCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; case_id: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  async function loadStats() {
    try {
      const { data: cases } = await supabase
        .from('cases')
        .select('*, profiles:profiles!client_id(full_name, email)')
        .order('created_at', { ascending: false })
        .limit(5);

      const { count: total } = await supabase
        .from('cases')
        .select('*', { count: 'exact', head: true });

      const { count: submitted } = await supabase
        .from('cases')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'submitted');

      const { count: inProg } = await supabase
        .from('cases')
        .select('*', { count: 'exact', head: true })
        .in('status', ['in_progress', 'under_review', 'awaiting_client_action', 'quote_sent', 'awaiting_payment', 'payment_confirmed']);

      const { count: done } = await supabase
        .from('cases')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      setStats({
        totalCases: total || 0,
        submitted: submitted || 0,
        inProgress: inProg || 0,
        completed: done || 0,
      });
      setRecentCases(cases || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    const { error } = await supabase.from('cases').delete().eq('id', deleteTarget.id);

    setIsDeleting(false);
    setDeleteTarget(null);

    if (error) {
      showToast('error', `Failed to delete case: ${error.message}`);
    } else {
      showToast('success', `Case ${deleteTarget.case_id} deleted successfully.`);
      // Refresh stats and list immediately
      setLoading(true);
      await loadStats();
    }
  };

  const statCards = [
    { label: 'New / Submitted', value: stats.submitted, icon: '📥', color: 'text-blue-600', bg: 'bg-blue-50', link: '/dashboard/admin/cases?status=submitted' },
    { label: 'In Progress', value: stats.inProgress, icon: '⚙️', color: 'text-orange-600', bg: 'bg-orange-50', link: '/dashboard/admin/cases?status=in_progress' },
    { label: 'Completed', value: stats.completed, icon: '✅', color: 'text-green-600', bg: 'bg-green-50', link: '/dashboard/admin/cases?status=completed' },
    { label: 'Total Cases', value: stats.totalCases, icon: '📁', color: 'text-purple-600', bg: 'bg-purple-50', link: '/dashboard/admin/cases' },
  ];

  return (
    <div className="max-w-6xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white text-[14px] font-[600] transition-all ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'success'
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          }
          {toast.msg}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteModal
          caseId={deleteTarget.id}
          caseLabel={deleteTarget.case_id}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-[800] text-[#0a192f]">Admin Dashboard</h1>
        <p className="text-gray-500 text-[15px] mt-1">Manage all client cases, invoices, and messages.</p>
      </div>

      {/* Quick Navigation */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="/dashboard/admin/cases" className="flex items-center gap-2 bg-[#0c1940] hover:bg-[#0c1940]/90 text-white text-[13px] font-[700] px-4 py-2.5 rounded-lg transition-colors shadow-sm">
          📁 All Cases
        </Link>
        <Link href="/dashboard/admin/clients" className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#0a192f] text-[13px] font-[700] px-4 py-2.5 rounded-lg transition-colors shadow-sm border border-gray-200">
          👥 Clients
        </Link>
        <Link href="/dashboard/admin/submissions" className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#0a192f] text-[13px] font-[700] px-4 py-2.5 rounded-lg transition-colors shadow-sm border border-gray-200">
          📬 Submissions
        </Link>
        <Link href="/dashboard/admin/payments" className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#0a192f] text-[13px] font-[700] px-4 py-2.5 rounded-lg transition-colors shadow-sm border border-gray-200">
          💳 Payments
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <Link
            key={s.label}
            href={s.link}
            className={`${s.bg} border border-${s.color.split('-')[1]}-100 rounded-2xl p-5 hover:shadow-md transition-all group`}
          >
            <div className="text-[24px] mb-3">{s.icon}</div>
            <div className={`text-[36px] font-[900] mb-1 ${s.color}`}>{loading ? '—' : s.value}</div>
            <div className="text-[13px] text-gray-600 font-[600] group-hover:underline">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[16px] font-[800] text-[#0a192f]">Recent Cases</h2>
          <Link href="/dashboard/admin/cases" className="text-[13px] font-[700] text-[#d4af37] hover:underline">View All →</Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <svg className="animate-spin h-6 w-6 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : recentCases.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-[14px]">No cases yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Case ID</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((c) => {
                  const statusColors: Record<string, string> = {
                    submitted: 'bg-gray-100 text-gray-700',
                    under_review: 'bg-blue-100 text-blue-700',
                    in_progress: 'bg-indigo-100 text-indigo-700',
                    awaiting_client_action: 'bg-orange-100 text-orange-700',
                    completed: 'bg-green-100 text-green-700',
                    closed: 'bg-red-100 text-red-700',
                  };
                  const statusLabels: Record<string, string> = {
                    submitted: 'Submitted',
                    under_review: 'Under Review',
                    in_progress: 'In Progress',
                    awaiting_client_action: 'Awaiting Client',
                    quote_sent: 'Quote Sent',
                    awaiting_payment: 'Awaiting Payment',
                    payment_confirmed: 'Payment Confirmed',
                    completed: 'Completed',
                    closed: 'Closed',
                  };
                  const client = c.profiles as any;
                  return (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-[14px] font-[800] text-[#0a192f]">{c.case_id}</td>
                      <td className="py-4 px-6">
                        <p className="text-[13px] font-[600] text-gray-800">{client?.full_name || '—'}</p>
                        <p className="text-[11px] text-gray-400">{client?.email}</p>
                      </td>
                      <td className="py-4 px-6 text-[13px] text-gray-600 max-w-[140px] truncate">{c.service_type}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-[700] ${statusColors[c.status] || 'bg-gray-100 text-gray-700'}`}>
                          {statusLabels[c.status] || c.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <Link href={`/dashboard/admin/cases/${c.id}`} className="text-[13px] font-[700] text-[#d4af37] hover:underline whitespace-nowrap">
                            Manage →
                          </Link>
                          <button
                            onClick={() => setDeleteTarget({ id: c.id, case_id: c.case_id })}
                            className="text-[13px] font-[700] text-red-500 hover:text-red-700 transition-colors"
                            title="Delete case"
                          >
                            Delete
                          </button>
                        </div>
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
