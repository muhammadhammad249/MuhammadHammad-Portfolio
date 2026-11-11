import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  // Canonical host redirect: redirect *.vercel.app deployments and www.repukeel.com to https://repukeel.com.
  // Uses 301 (Moved Permanently) — the standard canonical-consolidation signal for search engines.
  // Catches the production alias (repukeel.vercel.app) and all preview deployment subdomains.
  const host = request.headers.get('host')?.toLowerCase() || '';
  const isVercelDeploy = host.endsWith('.vercel.app');
  const isWww = host === 'www.repukeel.com';
  if (isVercelDeploy || isWww) {
    const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://repukeel.com');
    return NextResponse.redirect(destination, 301);
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://siiucfkyaigylhpdquif.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_6UAGk7cjIUx-VnNT6fYvzQ_pQ7rlAhW';

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // This will refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/checkout');

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
