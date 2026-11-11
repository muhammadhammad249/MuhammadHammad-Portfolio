/* eslint-disable */
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        // Per security best practice, show generic success even if email not found
        console.error('Password reset error:', resetError);
      }
      // Always show success to avoid user enumeration
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-68px)] bg-[var(--bg-soft)] items-center justify-center py-12 px-6">
      <div className="card-light max-w-md w-full relative overflow-hidden">
        
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--gold)]"></div>
        
        <div className="mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-[13px] font-[600] text-[var(--text-body)] hover:text-[var(--gold)] transition-colors mb-6">
            &larr; Back to login
          </Link>
          <h1 className="text-2xl font-[800] text-[var(--text-heading)] mb-2">Reset Password</h1>
          <p className="text-[14px] text-[var(--text-body)]">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h3 className="text-[15px] font-[700] text-green-800 mb-1">Check your email</h3>
            <p className="text-[13px] text-green-700">
              If an account with that email exists, we&apos;ve sent password reset instructions to <strong>{email}</strong>.
            </p>
            <Link href="/login" className="mt-4 inline-block text-[13px] font-[600] text-green-700 hover:underline">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                {error}
              </div>
            )}
            <div>
              <label className="block text-[13px] font-[700] text-[var(--text-heading)] mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] outline-none transition-shadow text-[14px]" 
                placeholder="you@example.com"
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-gold-solid w-full py-3.5 text-[15px] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-[#0a192f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending link...
                </>
              ) : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
