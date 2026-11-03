import { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_COOKIE = 'accessToken';
const REFRESH_TOKEN_COOKIE = 'refreshToken';

const isTokenValid = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp?: number }>(token);

    return typeof exp === 'number' && exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export type SessionResult =
  | { status: 'valid' }
  | { status: 'refreshed'; cookies: string[] }
  | { status: 'unauthenticated' }
  | { status: 'unavailable' };

export const refreshSession = async (
  req: NextRequest
): Promise<SessionResult> => {
  const token = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (token && isTokenValid(token)) {
    return { status: 'valid' };
  }

  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return { status: 'unauthenticated' };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/access-token`,
      {
        method: 'GET',
        headers: {
          Cookie: req.headers.get('cookie') ?? '',
        },
        cache: 'no-store',
      }
    );
    console.log(response.status);
    if (response.status === 401 || response.status === 403) {
      return { status: 'unauthenticated' };
    }

    if (!response.ok) {
      return { status: 'unavailable' };
    }

    const cookies = response.headers.getSetCookie();

    const hasAccessToken = cookies.some((cookie) =>
      cookie.startsWith(`${ACCESS_TOKEN_COOKIE}=`)
    );

    if (!hasAccessToken) {
      return { status: 'unavailable' };
    }

    return {
      status: 'refreshed',
      cookies,
    };
  } catch {
    return { status: 'unavailable' };
  }
};
