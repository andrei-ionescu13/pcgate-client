import { isServer } from '@tanstack/react-query';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { ApiError } from './api-error';

const hasClient = typeof window !== 'undefined';
const apiUrl = hasClient ? `/api` : process.env.NEXT_PUBLIC_API_PATH;

const buildSearchParams = (query: Record<string, any>): string => {
  const searchParams: URLSearchParams = new URLSearchParams();
  Object.keys(query).forEach((key) => {
    query[key] && searchParams.append(key, query[key]);
  });

  return `${searchParams.toString()}`;
};

const refreshAccessToken = async () => {
  const res = await fetch('/api/refresh-token', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    window.location.href = '/login';
    throw new Error('Unable to refresh token');
  }

  return res.json();
};

type Response = Awaited<ReturnType<typeof fetch>>;

const handleSuccessResponse = async <T>(response: Response) => {
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();

  return text as T;
};

export const appFetch = async <T>({
  url,
  config = {},
  query = {},
}: {
  url: string;
  config?: RequestInit;
  query?: Record<string, any>;
}): Promise<T> => {
  const constructedUrl = `${apiUrl}${url}${buildSearchParams(query)}`;
  let cookieStore: ReadonlyRequestCookies | undefined;

  if (isServer) {
    const { cookies } = await import('next/headers');
    cookieStore = await cookies();
  }

  const response = await fetch(constructedUrl, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
      ...(isServer && cookieStore && { Cookie: cookieStore.toString() }),
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await response.json();

    throw new ApiError(response.status, data.message);
  }

  return handleSuccessResponse<T>(response);
};

export const appFetchAuth = async <T>({
  url,
  config = {},
  query = {},
}: {
  url: string;
  config?: RequestInit;
  query?: Record<string, any>;
}): Promise<T> => {
  const constructedUrl = `${apiUrl}${url}${query ? `?${buildSearchParams(query)}` : ''}`;
  let cookieStore: ReadonlyRequestCookies | undefined;

  if (isServer) {
    const { cookies } = await import('next/headers');
    cookieStore = await cookies();
  }

  const request = () =>
    fetch(constructedUrl, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
        ...(isServer && cookieStore && { Cookie: cookieStore.toString() }),
      },
      cache: 'no-store',
      credentials: 'include',
    });

  let response = await request();

  if (!response.ok) {
    let data = await response.json();

    if (response.status !== 401) {
      throw new ApiError(response.status, data.message);
    }

    await refreshAccessToken();

    response = await request();

    if (response.ok) {
      return handleSuccessResponse<T>(response);
    }

    data = await response.json();

    throw new ApiError(response.status, data.message);
  }

  return handleSuccessResponse<T>(response);
};
