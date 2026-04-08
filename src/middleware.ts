import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow access to the lock page itself
  if (pathname === '/lock') {
    return NextResponse.next();
  }

  // 2. Allow access to static assets and Next.js internal files
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/assets') ||
    pathname.includes('.') // Matches files like favicon.ico, images, etc.
  ) {
    return NextResponse.next();
  }

  // 3. Check for the auth cookie
  const authToken = request.cookies.get('auth_token')?.value;

  const guestPass = process.env.GUEST_PASSWORD || "nehakarthik2026";
  const adminPass = process.env.ADMIN_PASSWORD || "nk2026@meragi";

  // Admin page restriction
  if (pathname.startsWith('/admin') && authToken !== adminPass) {
    const url = request.nextUrl.clone();
    url.pathname = '/'; // Guests redirected to home if they try to access admin
    return NextResponse.redirect(url);
  }

  const isAuth = authToken === guestPass || authToken === adminPass;

  if (isAuth) {
    return NextResponse.next();
  }

  // 4. Redirect to lock page if not authenticated
  const url = request.nextUrl.clone();
  url.pathname = '/lock';
  return NextResponse.redirect(url);
}

// Optionally, configure which paths the middleware should run on
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
