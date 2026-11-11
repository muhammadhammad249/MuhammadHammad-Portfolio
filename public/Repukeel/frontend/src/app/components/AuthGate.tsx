/* eslint-disable */
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const PROTECTED_ROUTES = ['/dashboard', '/checkout'];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // 'loading' | 'authorized' | 'unauthorized'
  const [authState, setAuthState] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    if (!isProtectedRoute(pathname)) {
      setAuthState('authorized');
      return;
    }

    let resolved = false;

    // Check session from localStorage (instant on returning users)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (resolved) return;
      if (session?.user) {
        resolved = true;
        setAuthState('authorized');
      }
      // Don't redirect yet — wait for onAuthStateChange too
    });

    // onAuthStateChange fires reliably even on first load when token
    // hasn't been read from localStorage yet
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (resolved) return;
      if (event === 'SIGNED_IN' && session?.user) {
        resolved = true;
        setAuthState('authorized');
      } else if (event === 'SIGNED_OUT') {
        resolved = true;
        setAuthState('unauthorized');
      } else if (event === 'INITIAL_SESSION') {
        if (session?.user) {
          resolved = true;
          setAuthState('authorized');
        } else {
          resolved = true;
          setAuthState('unauthorized');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname]);

  useEffect(() => {
    if (authState === 'unauthorized' && isProtectedRoute(pathname)) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [authState, pathname, router]);

  // Show spinner while checking auth on protected routes
  if (authState === 'loading' && isProtectedRoute(pathname)) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return <>{children}</>;
}
