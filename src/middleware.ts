// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const hasToken = !!(request.cookies.get('accessToken') || request.cookies.get('refreshToken'));
  const locale = request.cookies.get('NEXT_LOCALE') || 'en'
  const guestGuardPaths = ['/login', '/register']
  const guardType = guestGuardPaths.includes(request.nextUrl.pathname) ? 'guest' : 'auth';

  if (!hasToken && guardType === 'auth') {
    return NextResponse.redirect(new URL(`${locale}/login`, request.url))
  }

  if (hasToken && guardType === 'guest') {
    return NextResponse.redirect(new URL(`${locale}/`, request.url))
  }

  return response;
}

export const config = {
  matcher: [
    '/wishlist',
    '/account',
    '/account/:path*',
    '/login',
    '/register',
  ],
}