import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import type { Language } from './contexts/settings-context';
import { appFetch } from './utils/app-fetch';
import { getSession } from './utils/get-session';

export const listLanguages = () =>
  appFetch<Language[]>({
    url: '/languages',
  });

const authGuardPaths = [/^\/cart$/, /^\/wishlist$/, /^\/account(\/.*)?$/];

const guestGuardPaths = [
  /^\/login$/,
  /^\/register$/,
  /^\/password-recovery$/,
  /^\/password-reset$/,
];

const removeLocaleFromUrl = (pathname: string) =>
  pathname.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?(?=\/|$)/, '');

const cleanUrl = (url: string) => {
  let cleanedUrl = removeLocaleFromUrl(url);
  return cleanedUrl.replace(/\/{2,}/g, '/');
};

export default async function proxy(req: NextRequest) {
  const languages = await listLanguages();
  const locales = languages.map((language) => language.code);
  const defaultLocale = req.headers.get('x-your-custom-locale') || 'en';
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  });

  const response = handleI18nRouting(req);
  const pathname = cleanUrl(req.nextUrl.pathname);
  const { isAuthenticated } = await getSession();

  if (!isAuthenticated && authGuardPaths.some((r) => r.test(pathname))) {
    return NextResponse.redirect(
      new URL(`/${req.nextUrl.locale}/login`, req.url)
    );
  }

  if (isAuthenticated && guestGuardPaths.some((r) => r.test(pathname))) {
    return NextResponse.redirect(new URL(`/${req.nextUrl.locale}`, req.url));
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
