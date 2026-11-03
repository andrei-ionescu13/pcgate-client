import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { refreshSession } from './utils/refresh-session';
import { routing } from './i18n/routing';

// Ideally import these from your shared i18n configuration.
const locales = routing.locales;
const defaultLocale = routing.defaultLocale;

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
});

const authGuardPaths = [/^\/cart$/, /^\/wishlist$/, /^\/account(?:\/.*)?$/];

const guestGuardPaths = [
  /^\/login$/,
  /^\/register$/,
  /^\/password-recovery$/,
  /^\/password-reset$/,
];

const getLocale = (pathname: string): string =>
  locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  ) ?? defaultLocale;

const removeLocale = (pathname: string): string => {
  const locale = getLocale(pathname);

  if (pathname === `/${locale}`) return '/';

  return pathname.startsWith(`/${locale}/`)
    ? pathname.slice(locale.length + 1)
    : pathname;
};

const applyCookies = (response: NextResponse, cookies: string[]) => {
  cookies.forEach((cookie) => {
    response.headers.append('Set-Cookie', cookie);
  });
};

export default async function proxy(req: NextRequest) {
  const pathname = removeLocale(req.nextUrl.pathname);
  const locale = getLocale(req.nextUrl.pathname);

  const session = await refreshSession(req);

  // Update the incoming request cookies so downstream
  // middleware and server rendering can see the new token.
  if (session.status === 'refreshed') {
    for (const cookie of session.cookies) {
      const pair = cookie.split(';', 1)[0];
      const separator = pair.indexOf('=');

      if (separator === -1) continue;

      const name = pair.slice(0, separator);
      const value = pair.slice(separator + 1);

      if (name === 'accessToken') {
        req.cookies.set(name, value);
      }
    }
  }

  const isAuthenticated =
    session.status === 'valid' || session.status === 'refreshed';

  const isAuthRoute = authGuardPaths.some((route) => route.test(pathname));

  const isGuestRoute = guestGuardPaths.some((route) => route.test(pathname));

  let response: NextResponse;

  if (session.status === 'unauthenticated' && isAuthRoute) {
    response = NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  } else if (isAuthenticated && isGuestRoute) {
    response = NextResponse.redirect(new URL(`/${locale}`, req.url));
  } else {
    response = handleI18nRouting(req);
  }

  // Preserve refreshed cookies on redirects and i18n responses.
  if (session.status === 'refreshed') {
    applyCookies(response, session.cookies);
  }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
