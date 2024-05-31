import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("inside middleware")
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/sign-up' || path === '/Leaderboard';
  const isProtectedPath = path === '/user/dashboard';

  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/user/dashboard', request.nextUrl));
  }

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/sign-up', request.nextUrl));
  }

  return NextResponse.next(); // Proceed with the request if no conditions match
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    // '/profile',
    '/sign-up',
    '/user/dashboard',
    '/about'
  ]
};
