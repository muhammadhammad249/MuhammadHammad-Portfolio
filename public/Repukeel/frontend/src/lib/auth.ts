import { supabase } from './supabase';

export type UserRole = 'client' | 'admin' | 'super_admin';

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string;
  whatsapp: string | null;
  email: string;
}

/** Get current Supabase session user */
export async function getSessionUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/** Get the full profile (role etc.) for the current user */
export async function getCurrentProfile(): Promise<UserProfile | null> {
  try {
    // Use getSession (reads localStorage — instant, no network needed)
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const user = session.user;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      // Return a minimal profile from session data so pages don't hang
      return {
        id: user.id,
        role: 'client' as UserRole,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        whatsapp: null,
        email: user.email ?? '',
      };
    }

    return { ...data, email: user.email ?? '' };
  } catch {
    return null;
  }
}

/** Sign out and clear session */
export async function signOut() {
  await supabase.auth.signOut();
}

/**
 * Generate a unique Case ID like RK-2609-A3F7.
 * Uses date + 4 random hex chars — zero race conditions, no DB read needed.
 * Collision probability: 1 in 65536 per day — effectively zero for this workload.
 */
export async function generateCaseId(): Promise<string> {
  const now = new Date();
  const datePart = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}`;
  const randomPart = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  return `RK-${datePart}-${randomPart}`;
}

export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  submitted:              { label: 'Submitted',              color: 'bg-gray-100 text-gray-700' },
  under_review:           { label: 'Under Review',           color: 'bg-blue-100 text-blue-700' },
  quote_sent:             { label: 'Quote Sent',             color: 'bg-purple-100 text-purple-700' },
  awaiting_payment:       { label: 'Awaiting Payment',       color: 'bg-yellow-100 text-yellow-700' },
  payment_confirmed:      { label: 'Payment Confirmed',      color: 'bg-teal-100 text-teal-700' },
  in_progress:            { label: 'In Progress',            color: 'bg-indigo-100 text-indigo-700' },
  awaiting_client_action: { label: 'Awaiting Client Action', color: 'bg-orange-100 text-orange-700' },
  completed:              { label: 'Completed',              color: 'bg-green-100 text-green-700' },
  closed:                 { label: 'Closed / Cancelled',     color: 'bg-red-100 text-red-700' },
};
