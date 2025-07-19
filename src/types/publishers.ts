import { Decoded } from '@/contexts/auth-context';
import type { Asset } from './common';

export interface Publisher {
  _id: string;
  name: string;
  logo: Asset;
  slug: string;
}
// eslint-disable-next-line @next/next/no-server-import-in-page
import { listLanguages } from '@/contexts/settings-context';
import { defaultLocale, localePrefix } from 'config';
import jwtDecode from 'jwt-decode';
import createMiddleware from 'next-intl/middleware';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

export const getNewAccesToken = async (
  cookies: RequestCookies
): Promise<any> => {
  const headers = {
    Cookie: cookies.toString(),
  };

  const respose = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/auth/access-token`,
    {
      headers,
    }
  );

  if (respose.ok) {
    const data = await respose.json();
    return data;
  }

  return null;
};

const checkSession = async (request: NextRequest, response: NextResponse) => {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  if (!!accessToken) {
    const decoded: Decoded = jwtDecode(accessToken);

    if (decoded.exp > Date.now() / 1000) {
      return decoded;
    }
  }

  if (
    !!refreshToken &&
    (jwtDecode(refreshToken) as Decoded).exp > Date.now() / 1000
  ) {
    const newAccesToken = await getNewAccesToken(request.cookies);

    if (!newAccesToken) {
      return null;
    }

    response.cookies.set('accessToken', newAccesToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    const decoded: Decoded = jwtDecode(newAccesToken);
    return decoded;
  }

  return null;
};

const authGuardPahs = [
  /^\/account$/,
  /^\/cart$/,
  /^\/wishlist$/,
  /^\/account(\/.*)?$/,
];

const guestGuardPaths = [
  /^\/login$/,
  /^\/register$/,
  /^\/password-recovery$/,
  /^\/password-reset$/,
];

const testAgainstRegexArray = (str: string, array: RegExp[]) => {
  let isMatch = false;

  for (let index = 0; index < array.length; index++) {
    if (array[index].test(str)) {
      isMatch = true;
      break;
    }
  }

  return isMatch;
};

const removeLocaleFromUrl = (url: string) => {
  const pattern = /(?<=\/)([a-z]{2}([-_][A-Z]{2})?)(?=\/)/g;
  return url.replace(pattern, '');
};

const cleanUrl = (url: string) => {
  let cleanedUrl = removeLocaleFromUrl(url);
  return cleanedUrl.replace(/\/{2,}/g, '/');
};

export async function middleware(request: NextRequest) {
  const languages = await listLanguages();
  const locales = languages.map((language) => language.code);

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localePrefix,
  });
  const response = handleI18nRouting(request);
  const session = await checkSession(request, response);

  if (
    session &&
    testAgainstRegexArray(cleanUrl(request.nextUrl.pathname), guestGuardPaths)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    !session &&
    testAgainstRegexArray(cleanUrl(request.nextUrl.pathname), authGuardPahs)
  ) {
    return Response.redirect(new URL('/login', request.url), 303);
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
