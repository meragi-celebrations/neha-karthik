import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow access to public paths and static assets
  const publicPaths = ['/lock'];
  if (
    publicPaths.includes(pathname) ||
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Check for the auth cookie
  const authToken = request.cookies.get('auth_token')?.value;

  // Values from injected env vars or fallbacks
  const guestPass = process.env.GUEST_PASSWORD || "nehakarthik2026";
  const adminPass = process.env.ADMIN_PASSWORD || "nk2026@meragi";

  // Admin page restriction
  if (pathname.startsWith('/admin') && authToken !== adminPass) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  const isAuth = authToken === guestPass || authToken === adminPass;

  if (isAuth) {
    return NextResponse.next();
  }

  // 3. Redirect to lock page if not authenticated
  const url = request.nextUrl.clone();
  url.pathname = '/lock';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
