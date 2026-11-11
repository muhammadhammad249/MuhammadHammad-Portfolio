/* eslint-disable */
'use client';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { STATUS_LABELS } from '@/lib/auth';

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const isNew = searchParams.get('new') === '1';

  const [caseData, setCaseData] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setCurrentUserId(user.id);

        const [{ data: c }, { data: u }, { data: msgs }] = await Promise.all([
          supabase.from('cases').select('*').eq('id', id).single(),
          supabase.from('case_updates').select('*').eq('case_id', id).order('created_at', { ascending: true }),
          supabase.from('messages').select('*').eq('case_id', id).order('created_at', { ascending: true }),
        ]);
        setCaseData(c);
        setUpdates(u || []);
        setMessages(msgs || []);
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !currentUserId) return;
    setIsSending(true);

    const { error } = await supabase.from('messages').insert({
      case_id: id,
      sender_id: currentUserId,
      message: replyMessage.trim()
    });

    if (!error) {
      const { data: msgs } = await supabase
        .from('messages')
        .select('*')
        .eq('case_id', id)
        .order('created_at', { ascending: true });
      setMessages(msgs || []);
      setReplyMessage('');
    } else {
      showToastMsg('error', 'Failed to send message.');
    }
    setIsSending(false);
  };

  const showToastMsg = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
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
        <Link href="/dashboard/cases" className="text-[#d4af37] font-[700] mt-4 inline-block">← Back to Cases</Link>
      </div>
    );
  }

  const statusInfo = STATUS_LABELS[caseData.status] || { label: caseData.status, color: 'bg-gray-100 text-gray-700' };

  return (
    <div className="max-w-4xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white text-[14px] font-[600] ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.msg}
        </div>
      )}


      {/* New case banner */}
      {isNew && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-green-600"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <p className="font-[700] text-green-800 text-[15px]">Inquiry Submitted Successfully!</p>
            <p className="text-[13px] text-green-700 mt-1">Your case <strong>{caseData.case_id}</strong> has been created. Our team will review it and get back to you soon.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/dashboard/cases" className="text-gray-400 hover:text-gray-600 text-[13px] font-[600]">← My Cases</Link>
          </div>
          <h1 className="text-[24px] font-[800] text-[#0a192f]">{caseData.case_id}</h1>
          <p className="text-gray-500 text-[14px] mt-1">{caseData.service_type}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-[700] ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
          <p className="text-[12px] text-gray-400">Filed {new Date(caseData.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

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
            Current Stage: <span className="text-blue-600">{statusInfo.label}</span>
          </p>
        </div>
      </div>

      {/* Case Info Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="text-[14px] font-[800] text-[#0a192f] mb-4">Case Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Case ID', value: caseData.case_id },
            { label: 'Service', value: caseData.service_type },
            { label: 'Platform', value: caseData.platform || '—' },
            { label: 'Urgency', value: caseData.urgency || 'normal' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-[14px] font-[600] text-[#0a192f] capitalize">{item.value}</p>
            </div>
          ))}
        </div>
        {caseData.description && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-[11px] font-[700] text-gray-400 uppercase tracking-wider mb-2">Description</p>
            <p className="text-[14px] text-gray-600 leading-relaxed">{caseData.description}</p>
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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="text-[14px] font-[800] text-[#0a192f] mb-4">Timeline & Messages</h3>
        <div className="space-y-6">
          {[...updates.filter(u => u.notify_client !== false), ...messages]
            .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            .map((item, idx, arr) => {
              const isMessage = 'message' in item;
              if (isMessage) {
                const isOwn = item.sender_id === currentUserId;
                return (
                  <div key={`msg-${item.id}`} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl max-w-[85%] ${isOwn ? 'bg-[#d4af37] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                      <p className="text-[14px] whitespace-pre-wrap">{item.message}</p>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {new Date(item.created_at).toLocaleString()} • {isOwn ? 'You' : 'Admin'}
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
                      {idx !== arr.length - 1 && <div className="w-px h-full bg-gray-100 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-[700] text-[#0a192f] text-[14px]">Status changed to {STATUS_LABELS[item.status]?.label || item.status}</span>
                        <span className="text-[11px] text-gray-400">{new Date(item.created_at).toLocaleString()}</span>
                      </div>
                      {item.note && (
                        <div className="mt-2 bg-[#f8fafc] border border-gray-200 p-3 rounded-xl">
                          <p className="text-[13px] text-gray-700 whitespace-pre-wrap">{item.note}</p>
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
        
        <form onSubmit={handleSendReply} className="mt-6 flex gap-3">
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Type your reply here..."
            rows={2}
            className="flex-1 px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#d4af37] resize-none transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendReply(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={isSending || !replyMessage.trim()}
            className="self-end px-6 h-[48px] bg-[#d4af37] hover:bg-[#c19b2e] text-white font-[700] text-[14px] rounded-xl transition-colors disabled:opacity-50"
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

    </div>
  );
}
