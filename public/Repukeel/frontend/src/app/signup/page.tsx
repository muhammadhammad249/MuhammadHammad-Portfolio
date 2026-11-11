'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !whatsapp) {
      setError('Please fill in all required fields (Full Name, Phone Number, Email, Password).');
      return;
    }
    // Basic phone validation (at least 7 characters)
    if (whatsapp.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid phone/WhatsApp number.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms and Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, whatsapp },
      },
    });

    if (signUpError) {
      const msg = signUpError.message.toLowerCase();
      if (msg.includes('rate limit')) {
        setError('Too many registration attempts. Please try again later.');
        setLoading(false);
        return;
      } else if (msg.includes('already registered') || msg.includes('user already exists')) {
        setError('This email is already registered. Please login instead.');
        setLoading(false);
        return;
      } else if (
        msg.includes('database error') ||
        msg.includes('sending confirmation email') ||
        msg.includes('smtp') ||
        msg.includes('email')
      ) {
        // Auth user may have been created — try logging in directly
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (!loginError && loginData.user) {
          // Also try to upsert profile
          await supabase.from('profiles').upsert({
            id: loginData.user.id,
            full_name: fullName,
            email,
            whatsapp,
            role: 'client',
          }, { onConflict: 'id' });
          router.push('/dashboard');
          return;
        }
        // Could not login — show success screen (account likely needs email confirm)
        setLoading(false);
        setSuccess(true);
        return;
      } else {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
    }

    // If user already existed (Supabase returns identities=[]) — duplicate email
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError('This email is already registered. Please login instead.');
      setLoading(false);
      return;
    }

    // Update profile with whatsapp and email — always force role to 'client'
    if (data.user) {
      await supabase
        .from('profiles')
        .update({ full_name: fullName, whatsapp, email, role: 'client' })
        .eq('id', data.user.id);
    }

    // No email confirmation needed — sign in directly
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (!loginError) {
      // Notify admin of new signup (fire and forget)
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'new_signup', name: fullName, email, phone: whatsapp }),
      }).catch(() => {});
      router.push('/dashboard');
      return;
    }

    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-green-600">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-[24px] font-[800] text-[#0a192f] mb-3">Account Created!</h2>
          <p className="text-[15px] text-gray-500 mb-6">
            Your account has been created for <strong>{email}</strong>. You can now log in with your email and password.
          </p>
          <Link href="/login" className="btn btn-navy-solid w-full text-center block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* Left: Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-16 py-16">
        <div className="max-w-md w-full mx-auto">

          <Link href="/" className="flex items-center gap-3 mb-10">
            <Image src="/logo.png" alt="RepuKeel" width={140} height={40} className="h-[38px] w-auto object-contain" style={{ width: 'auto' }} priority />
          </Link>

          <h1 className="text-[32px] font-[900] text-[#0a192f] mb-2">Create your account</h1>
          <p className="text-[15px] text-gray-500 mb-8">
            Join RepuKeel to track and manage your cases online.
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 mb-6 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[13px] font-[700] text-[#0a192f] mb-1.5">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Smith"
                className="w-full h-[48px] px-4 bg-[#f8fafc] border border-gray-200 rounded-[10px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-[15px] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-[700] text-[#0a192f] mb-1.5">WhatsApp / Phone Number *</label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full h-[48px] px-4 bg-[#f8fafc] border border-gray-200 rounded-[10px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-[15px] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-[700] text-[#0a192f] mb-1.5">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-[48px] px-4 bg-[#f8fafc] border border-gray-200 rounded-[10px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-[15px] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-[700] text-[#0a192f] mb-1.5">Password * <span className="text-gray-400 font-normal">(min 8 characters)</span></label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[48px] pl-4 pr-12 bg-[#f8fafc] border border-gray-200 rounded-[10px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-[15px] transition-all tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
                    {showPassword ? (
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    ) : (
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#d4af37]"
                required
              />
              <span className="text-[13px] text-gray-500 leading-relaxed">
                I agree to the{' '}
                <Link href="/terms-conditions" className="text-[#d4af37] font-[600] hover:underline">Terms and Conditions</Link>
                {' '}and{' '}
                <Link href="/privacy-policy" className="text-[#d4af37] font-[600] hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] bg-[#d4af37] hover:bg-[#c19b2e] text-white font-[700] text-[16px] rounded-[12px] flex items-center justify-center gap-2 mt-2 transition-colors shadow-lg shadow-[#d4af37]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-[14px] text-gray-500 mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-[#d4af37] font-[700] hover:underline">Sign In</Link>
          </p>
        </div>
      </div>

      {/* Right: Brand Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#0c1940] via-[#10245a] to-[#0c1940] items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10 text-center text-white max-w-[420px]">
          <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-8">
            <svg viewBox="0 0 24 24" fill="#d4af37" className="w-9 h-9">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </div>
          <h2 className="text-[32px] font-[900] mb-4 text-white">Your reputation, protected.</h2>
          <p className="text-blue-200 text-[16px] leading-relaxed mb-10">
            Access the RepuKeel client portal to submit cases, track progress in real-time and communicate directly with our team.
          </p>
          <div className="flex flex-col gap-4 text-left">
            {['Track your case status in real-time', 'Communicate securely with our team', 'Receive updates and final reports', 'Manage documents and files in one place'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="3" className="w-3 h-3"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span className="text-[14px] text-blue-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
