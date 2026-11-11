'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          router.push(`/login?next=${encodeURIComponent(pathname)}`);
          return;
        }

        // Only query profiles if we're NOT in the admin section
        if (!pathname.startsWith('/dashboard/admin')) {
          const { data: dbProfile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle();

          if (dbProfile) {
            // Redirect admins to their portal if they try to access the client dashboard
            if (dbProfile.role === 'admin' || dbProfile.role === 'super_admin') {
              router.push('/dashboard/admin');
              return;
            }
          }
        }
      } finally {
        setLoading(false);
      }
    }

    checkAuth();

    // Also listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9]">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex">



      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-[68px] flex items-center px-6 gap-4">
          <div className="flex-1">
            <h1 className="text-[15px] font-[700] text-[#0a192f]">
              {pathname.startsWith('/dashboard/admin') ? 'Admin Portal' : 'Client Portal'}
            </h1>
          </div>

          {!pathname.startsWith('/dashboard/admin') && (
            <Link
              href="/dashboard/new-inquiry"
              className="hidden sm:flex items-center gap-2 bg-[#d4af37] hover:bg-[#c19b2e] text-white text-[13px] font-[700] px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
              New Inquiry
            </Link>
          )}

        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
