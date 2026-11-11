/* eslint-disable */
'use client';
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // NO useEffect — no auto-redirect — no blink loop

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        setError('Incorrect email or password. Please try again.');
        return;
      }

      if (!data?.user) {
        setError('Login failed. Please try again.');
        return;
      }

      // Check role and redirect accordingly
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      const role = profile?.role ?? 'client';
      if (role === 'admin' || role === 'super_admin') {
        window.location.href = '/dashboard/admin';
      } else {
        window.location.href = nextUrl;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Something went wrong. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex">

      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative bg-white">

        {/* Back Button + Logo */}
        <div className="absolute top-10 left-6 md:left-10 flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            aria-label="Go Back"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="RepuKeel"
              width={140}
              height={40}
              className="h-[40px] w-auto object-contain"
              style={{ width: 'auto' }}
              priority
            />
          </div>
        </div>

        {/* Form */}
        <div className="max-w-[420px] w-full mx-auto mt-12">
          <h1 className="text-[40px] font-[900] text-[#0a192f] mb-2">Welcome Back</h1>
          <p className="text-[15px] text-gray-500 mb-8">Please enter your credentials to access your account</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 mb-6 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
              </svg>
              {error}
            </div>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-[700] text-[#0a192f]">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[20px] h-[20px]">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" /><path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={isLoading}
                  className="w-full h-[52px] pl-12 pr-4 bg-white border border-gray-200 rounded-[12px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-[15px] shadow-sm disabled:opacity-60"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[14px] font-[700] text-[#0a192f]">Password</label>
                <Link href="/forgot-password" className="text-[13px] font-[600] text-[#d4af37] hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[20px] h-[20px]">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="w-full h-[52px] pl-12 pr-12 bg-white border border-gray-200 rounded-[12px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-[15px] shadow-sm tracking-widest disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[20px] h-[20px]">
                    {showPassword ? (
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    ) : (
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[52px] bg-[#d4af37] hover:bg-[#c19b2e] text-white font-[700] text-[16px] rounded-[12px] flex items-center justify-center gap-2 mt-4 transition-colors shadow-lg shadow-[#d4af37]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[20px] h-[20px]">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[14px] text-gray-500 mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#d4af37] font-[700] hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right Info Section */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-[#0c1940] via-[#10245a] to-[#0c1940]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 flex flex-col items-center text-center text-white max-w-[450px]">
          <div className="mb-12 relative flex items-center justify-center">
            <img
              src="/login-logo-outline.png"
              alt="RepuKeel Shield"
              className="w-[130px] h-auto object-contain"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>
          <h2 className="text-[36px] font-[900] mb-5 tracking-tight text-white">RepuKeel Portal</h2>
          <p className="text-[14px] text-blue-100/50 mt-6">
            Need help?{' '}
            <a href="mailto:Legal@Repukeel.com" className="text-[var(--gold)] font-[600] hover:underline">Legal@Repukeel.com</a>
          </p>
        </div>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center"><h1 className="text-xl font-bold text-[#0a192f]">Loading RepuKeel Portal...</h1></div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}