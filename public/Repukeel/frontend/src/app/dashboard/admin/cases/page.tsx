/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { STATUS_LABELS } from '@/lib/auth';

const ALL_STATUSES = ['All', 'submitted', 'under_review', 'quote_sent', 'awaiting_payment', 'payment_confirmed', 'in_progress', 'awaiting_client_action', 'completed', 'closed'];

// ─── Confirmation Modal ───────────────────────────────────────────────────────
function DeleteModal({
  caseLabel,
  onCancel,
  onConfirm,
  isDeleting,
}: {
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

export default function AdminAllCasesPage() {
  const searchParams = useSearchParams();
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'All');

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; case_id: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  async function load() {
    const { data } = await supabase
      .from('cases')
      .select('*, profiles:profiles!client_id(full_name, email)')
      .order('created_at', { ascending: false });
    setCases(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
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
      // Remove from list immediately
      setCases((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    }
  };

  const filtered = cases.filter((c) => {
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const client = c.profiles as any;
    const matchSearch = !search ||
      c.case_id?.toLowerCase().includes(search.toLowerCase()) ||
      client?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      client?.email?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white text-[14px] font-[600] ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
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
          caseLabel={deleteTarget.case_id}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[26px] font-[800] text-[#0a192f]">All Cases</h1>
          <p className="text-gray-500 text-[15px] mt-1">{filtered.length} cases</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Case ID, name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#d4af37] transition-all"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] text-gray-700 outline-none focus:border-[#d4af37] transition-all"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{s === 'All' ? 'All Statuses' : (STATUS_LABELS[s]?.label || s)}</option>
          ))}
        </select>
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
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Case ID</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Urgency</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-[12px] font-[700] text-gray-400 uppercase tracking-wider">Filed</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="py-16 text-center text-gray-400 text-[14px]">No cases found.</td></tr>
                ) : filtered.map((c) => {
                  const statusInfo = STATUS_LABELS[c.status] || { label: c.status, color: 'bg-gray-100 text-gray-700' };
                  const client = c.profiles as any;
                  return (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-[14px] font-[800] text-[#0a192f]">{c.case_id}</td>
                      <td className="py-4 px-6">
                        <p className="text-[14px] font-[600] text-gray-800">{client?.full_name || '—'}</p>
                        <p className="text-[12px] text-gray-400">{client?.email || ''}</p>
                      </td>
                      <td className="py-4 px-6 text-[13px] text-gray-600 max-w-[150px] truncate">{c.service_type}</td>
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
                      <td className="py-4 px-6 text-[13px] text-gray-400">{new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <Link href={`/dashboard/admin/cases/${c.id}`} className="text-[13px] font-[700] text-[#d4af37] hover:underline">Manage →</Link>
                          <button
                            onClick={() => setDeleteTarget({ id: c.id, case_id: c.case_id })}
                            className="text-[13px] font-[700] text-red-500 hover:text-red-700 transition-colors"
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
        </div>
      )}
    </div>
  );
}
