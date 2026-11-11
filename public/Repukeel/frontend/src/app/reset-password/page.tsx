/* eslint-disable */
'use client';

import Link from 'next/link';
import { FormEvent, useState, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function ResetPasswordContent() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Supabase sends the user back with a session in the URL hash.
  // We need to listen for the PASSWORD_RECOVERY event to know the session is active.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });

    // Also check if there's already an active session (e.g. user refreshed the page)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message || 'Unable to reset password. The link may have expired — please request a new one.');
        return;
      }
      setMessage('Your password has been updated successfully!');
      // Sign out so the user logs in fresh with their new password
      await supabase.auth.signOut();
      setTimeout(() => router.push('/login'), 2500);
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!sessionReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-center">
          <h1 className="text-[22px] font-[800] text-[#0a192f] mb-3">Verifying Reset Link...</h1>
          <p className="text-[14px] text-gray-500 mb-6">
            Please wait while we verify your reset link. If you arrived here from an email, this should only take a moment.
          </p>
          <p className="text-[13px] text-gray-400">
            If nothing happens, <Link href="/forgot-password" className="text-[#d4af37] font-[600] hover:underline">request a new link</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#d4af37] rounded-t-2xl"></div>
        <h1 className="text-[24px] font-[800] text-[#0a192f] mb-2">Choose a New Password</h1>
        <p className="text-[14px] text-gray-500 mb-8">Use at least 8 characters.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2 mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            {error}
          </div>
        )}

        {message ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-[15px] font-[700] text-green-800 mb-1">{message}</p>
            <p className="text-[13px] text-green-700">Redirecting you to login...</p>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="new-password" className="block text-[13px] font-[700] text-[#0a192f] mb-1.5">New Password</label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full h-[48px] px-4 pr-12 bg-[#f8fafc] border border-gray-200 rounded-[10px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-[15px] transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    {showPassword ? <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> : <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>}
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-new-password" className="block text-[13px] font-[700] text-[#0a192f] mb-1.5">Confirm New Password</label>
              <input
                id="confirm-new-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full h-[48px] px-4 bg-[#f8fafc] border border-gray-200 rounded-[10px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-[15px] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[50px] bg-[#d4af37] hover:bg-[#c19b2e] text-white font-[700] text-[16px] rounded-[12px] flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8fafc]"><p className="text-gray-500">Loading…</p></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
