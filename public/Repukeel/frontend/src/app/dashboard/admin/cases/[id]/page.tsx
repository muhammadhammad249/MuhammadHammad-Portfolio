/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { STATUS_LABELS } from '@/lib/auth';

const ALL_STATUSES = [
  'submitted', 'under_review', 'quote_sent', 'awaiting_payment',
  'payment_confirmed', 'in_progress', 'awaiting_client_action', 'completed', 'closed'
];

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

export default function AdminCaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [caseData, setCaseData] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Update Status Form
  const [newStatus, setNewStatus] = useState('');
  const [updateNote, setUpdateNote] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [notifyClient, setNotifyClient] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Delete state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);

      const { data: c } = await supabase
        .from('cases')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!c) {
        setLoading(false);
        return;
      }

      setCaseData(c);
      setNewStatus(c.status);

      // Fetch the client details
      if (c.client_id) {
        const { data: clientProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', c.client_id)
          .single();
        if (clientProfile) {
          setClient(clientProfile);
        } else {
          setClient(null);
        }
      } else {
        setClient(null);
      }

      const { data: u } = await supabase
        .from('case_updates')
        .select('*')
        .eq('case_id', id)
        .order('created_at', { ascending: true });

      const { data: msgs } = await supabase
        .from('messages')
        .select('*')
        .eq('case_id', id)
        .order('created_at', { ascending: true });

      setUpdates(u || []);
      setMessages(msgs || []);
      setLoading(false);
    }
    if (id) load();
  }, [id]);

  const showToastMsg = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatus) return;

    setIsUpdating(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error: updateError } = await supabase.from('case_updates').insert({
      case_id: id,
      admin_id: user.id,
      status: newStatus,
      note: updateNote.trim() || null,
      internal_note: internalNote.trim() || null,
      notify_client: notifyClient
    });

    if (!updateError) {
      await supabase.from('cases').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', id);

      const { data: u } = await supabase
        .from('case_updates')
        .select('*')
        .eq('case_id', id)
        .order('created_at', { ascending: true });
        
      setUpdates(u || []);
      setCaseData({ ...caseData, status: newStatus });
      setUpdateNote('');
      setInternalNote('');
    }
    
    setIsUpdating(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    const { error } = await supabase.from('cases').delete().eq('id', id);
    setIsDeleting(false);
    setShowDeleteModal(false);

    if (error) {
      showToastMsg('error', `Failed to delete case: ${error.message}`);
    } else {
      // Navigate back to cases list after deletion
      router.push('/dashboard/admin/cases');
    }
  };

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

  if (!caseData) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Case not found.</p>
        <Link href="/dashboard/admin/cases" className="text-[#d4af37] font-[700] mt-4 inline-block">← Back to Cases</Link>
      </div>
    );
  }

  const currentStatusInfo = STATUS_LABELS[caseData.status] || { label: caseData.status, color: 'bg-gray-100 text-gray-700' };

  return (
    <div className="max-w-6xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white text-[14px] font-[600] ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.msg}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          caseLabel={caseData.case_id}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      )}

      {/* Back + Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <Link href="/dashboard/admin/cases" className="text-gray-400 hover:text-gray-600 text-[13px] font-[600] mb-4 inline-block">← All Cases</Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-[800] text-[#0a192f] flex items-center gap-3">
              {caseData.case_id}
              <span className={`px-2.5 py-1 rounded-full text-[12px] font-[700] ${currentStatusInfo.color}`}>
                {currentStatusInfo.label}
              </span>
            </h1>
            <p className="text-gray-500 text-[14px] mt-1">{caseData.service_type}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[13px] font-[600] text-[#0a192f]">{client?.full_name}</p>
              <p className="text-[12px] text-gray-500">{client?.email}</p>
              {client?.whatsapp && <p className="text-[12px] text-[#d4af37]">WhatsApp: {client.whatsapp}</p>}
            </div>
            {/* Delete button */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-[700] text-[13px] rounded-xl border border-red-200 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
              Delete Case
            </button>
          </div>
        </div>
      </div>

      {/* Visual Progress Tracker */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="text-[14px] font-[800] text-[#0a192f] mb-6">Live Tracking</h3>
        <div className="relative flex items-center justify-between w-full">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gray-100 -translate-y-1/2 z-0 hidden sm:block"></div>
          
          {[
            { label: 'Submitted', statuses: ['submitted'] },
            { label: 'Reviewing', statuses: ['under_review', 'quote_sent'] },
            { label: 'Payment', statuses: ['awaiting_payment', 'payment_confirmed'] },
            { label: 'In Progress', statuses: ['in_progress', 'awaiting_client_action'] },
            { label: 'Completed', statuses: ['completed', 'closed'] }
          ].map((step, index, array) => {
            const stepStatusIndex = array.findIndex(s => s.statuses.includes(caseData.status));
            const isCompleted = stepStatusIndex > index;
            const isActive = stepStatusIndex === index;
            
            return (
              <div key={step.label} className="relative z-10 flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                  isActive ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 
                  'bg-white border-gray-200 text-gray-300'
                }`}>
                  {isCompleted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : isActive ? (
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                  ) : (
                    <span className="text-[12px] font-[700]">{index + 1}</span>
                  )}
                </div>
                <p className={`mt-3 text-[12px] font-[700] text-center hidden sm:block ${
                  isCompleted ? 'text-green-600' : 
                  isActive ? 'text-blue-600' : 
                  'text-gray-400'
                }`}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
        {/* Mobile Labels */}
        <div className="mt-4 sm:hidden text-center">
          <p className="text-[14px] font-[700] text-[#0a192f]">
            Current Stage: <span className="text-blue-600">{currentStatusInfo.label}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Column: Details + Tabs */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Info Box */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-[14px] font-[800] text-[#0a192f] mb-4">Case Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-1">Platform</p>
                <p className="text-[14px] font-[600] text-[#0a192f]">{caseData.platform || '—'}</p>
              </div>
              <div>
                <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-1">Urgency</p>
                <p className={`text-[14px] font-[700] capitalize ${
                  caseData.urgency === 'emergency' ? 'text-red-600' : caseData.urgency === 'urgent' ? 'text-orange-500' : 'text-green-600'
                }`}>
                  {caseData.urgency || 'normal'}
                </p>
              </div>
            </div>
            {caseData.description && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-2">Description</p>
                <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-wrap">{caseData.description}</p>
              </div>
            )}
            {caseData.urls && caseData.urls.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-2">Submitted URLs</p>
                <div className="flex flex-col gap-1">
                  {caseData.urls.map((url: string, i: number) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#d4af37] hover:underline break-all font-mono">{url}</a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Timeline Box */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-[14px] font-[800] text-[#0a192f] mb-4">Timeline & Messages</h3>
            <div className="space-y-6">
              {[...updates, ...messages]
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .map((item, idx) => {
                  const isMessage = 'message' in item;
                  if (isMessage) {
                    const isOwn = item.sender_id === currentUserId;
                    return (
                      <div key={`msg-${item.id}`} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                        <div className={`px-4 py-3 rounded-2xl max-w-[85%] ${isOwn ? 'bg-[#d4af37] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                          <p className="text-[14px] whitespace-pre-wrap">{item.message}</p>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {new Date(item.created_at).toLocaleString()} • {isOwn ? 'You' : 'Client'}
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div key={`upd-${item.id}`} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                          {idx !== updates.length - 1 && <div className="w-px h-full bg-gray-100 mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-[700] text-[#0a192f] text-[14px]">Status changed to {STATUS_LABELS[item.status]?.label || item.status}</span>
                            <span className="text-[11px] text-gray-400">{new Date(item.created_at).toLocaleString()}</span>
                          </div>
                          {item.note && (
                            <div className="mt-2 bg-[#f8fafc] border border-gray-200 p-3 rounded-xl">
                              <p className="text-[13px] text-gray-700 whitespace-pre-wrap"><span className="font-[600]">Message to Client:</span> {item.note}</p>
                            </div>
                          )}
                          {item.internal_note && (
                            <div className="mt-2 bg-purple-50 border border-purple-200 p-3 rounded-xl">
                              <p className="text-[13px] text-purple-800 whitespace-pre-wrap"><span className="font-[600]">Internal Note:</span> {item.internal_note}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
              {updates.length === 0 && messages.length === 0 && (
                <p className="text-gray-400 text-[13px] text-center">No updates or messages yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Update Status */}
        <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6">
          
          {/* Client Details Box */}
          {client && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-[14px] font-[800] text-[#0a192f] mb-4">👤 Client Details</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-0.5">Name</p>
                  <p className="text-[14px] font-[600] text-[#0a192f]">{client.full_name}</p>
                </div>
                <div>
                  <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                  <a href={`mailto:${client.email}`} className="text-[14px] font-[600] text-[#d4af37] hover:underline break-all">{client.email}</a>
                </div>
                <div>
                  <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-0.5">Phone / WhatsApp</p>
                  {client.whatsapp ? (
                    <a href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-[14px] font-[600] text-green-600 hover:underline">
                      {client.whatsapp}
                    </a>
                  ) : (
                    <span className="text-[14px] text-gray-500">Not provided</span>
                  )}
                </div>
                {caseData.contact_preference && (
                  <div>
                    <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-0.5">Contact Preference</p>
                    <p className="text-[14px] font-[600] text-[#0a192f] capitalize">{caseData.contact_preference}</p>
                  </div>
                )}
              </div>
              <button
                onClick={async () => {
                  const isWhatsApp = client.whatsapp && client.whatsapp.replace(/\D/g, '').length >= 7;
                  const defaultMessage = `Hello ${client.full_name}, regarding your case ${caseData.case_id} at RepuKeel: `;
                  
                  // Log the outgoing action
                  await supabase.from('messages').insert({
                    case_id: caseData.id,
                    sender_id: currentUserId,
                    message: `[System] Admin initiated direct contact via ${isWhatsApp ? 'WhatsApp' : 'Email'}.`
                  });
                  // Refresh messages
                  const { data: msgs } = await supabase.from('messages').select('*').eq('case_id', caseData.id).order('created_at', { ascending: true });
                  if (msgs) setMessages(msgs);

                  if (isWhatsApp) {
                    window.open(`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
                  } else {
                    window.open(`mailto:${client.email}?subject=Regarding your RepuKeel Case ${caseData.case_id}&body=${encodeURIComponent(defaultMessage)}`, '_blank');
                  }
                }}
                className="w-full mt-5 h-[42px] bg-[#0a192f] hover:bg-[#112a52] text-white font-[700] text-[13px] rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Message Client
              </button>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-[84px]">
            <h3 className="text-[14px] font-[800] text-[#0a192f] mb-5">🔄 Update Status</h3>
            <form onSubmit={handleUpdateStatus} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-[700] text-gray-600 mb-1.5">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#d4af37] transition-all"
                >
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]?.label || s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-[700] text-gray-600 mb-1.5">Message to Client</label>
                <textarea
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  rows={3}
                  placeholder="Client will see this note..."
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#d4af37] resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[12px] font-[700] text-gray-600 mb-1.5">Internal Note (Admin Only)</label>
                <textarea
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  rows={2}
                  placeholder="Internal reference notes..."
                  className="w-full px-4 py-3 bg-purple-50 border border-purple-200 rounded-xl text-[14px] outline-none focus:border-purple-400 resize-none transition-all"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyClient}
                  onChange={(e) => setNotifyClient(e.target.checked)}
                  className="w-4 h-4 accent-[#d4af37]"
                />
                <span className="text-[13px] font-[600] text-gray-600">Notify client via portal</span>
              </label>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full h-[46px] bg-[#d4af37] hover:bg-[#c19b2e] text-white font-[700] text-[14px] rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : '✓'} Save Update
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
