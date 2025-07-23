import { isServer } from '@tanstack/react-query';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { ApiError } from './api-error';

const hasClient = typeof window !== 'undefined';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const apiUrl = hasClient ? `/api` : process.env.NEXT_PUBLIC_API_PATH;

const buildQueryString = (query: Record<string, any>): string => {
  const finalQuery: URLSearchParams = new URLSearchParams();

  Object.keys(query).forEach((key) => {
    query[key] && finalQuery.append(key, query[key]);
  });

  return finalQuery.toString();
};

const refreshAccessToken = async () => {
  const res = await fetch('/api/refresh-token', {
    method: 'POST',
    credentials: 'include', // Required to send cookies
  });

  if (!res.ok) {
    window.location.href = '/login'; // or use next/navigation's useRouter
    throw new Error('Unable to refresh token');
  }

  return res.json();
};

type ReturnType<T> = T extends Blob ? Blob : T;

export const appFetch = async <T>({
  req,
  res,
  url,
  config = {},
  noContentType = false,
  query = undefined,
  withAuth = false,
}: {
  req?: any;
  res?: any;
  url: string;
  config?: RequestInit;
  noContentType?: boolean;
  query?: Record<string, any>;
  withAuth?: boolean;
  responseType?: string;
}): Promise<ReturnType<T>> => {
  const { headers = {}, ...restConfig } = config;
  let cookieStore: ReadonlyRequestCookies | undefined;

  if (isServer) {
    const { cookies } = await import('next/headers');
    cookieStore = await cookies();
  }

  const request = () =>
    fetch(`${apiUrl}${url}${query ? `?${buildQueryString(query)}` : ''}`, {
      ...(!noContentType && {
        headers: {
          ...DEFAULT_HEADERS,
          ...headers,
          ...(isServer && cookieStore && { Cookie: cookieStore.toString() }),
        },
      }),
      ...restConfig,
      cache: 'no-store',
      credentials: 'include',
    });

  const handleSuccessResponse = async (response: any) => {
    const data: any = await response.text();

    if (response.headers.get('content-type').includes('json')) {
      return JSON.parse(data);
    }

    return data;
  };

  const appFetch = async () => {
    const response = await request();

    if (response.ok) {
      return await handleSuccessResponse(response);
    }

    const data = await response.json();

    throw new ApiError(response.status, data.message);
  };

  const appAuthFetch = async () => {
    let response = await request();

    if (response.ok) {
      return await handleSuccessResponse(response);
    }

    let data = await response.json();

    if (response.status !== 401) {
      throw new ApiError(response.status, data.message);
    }

    await refreshAccessToken();

    response = await request();

    if (response.ok) {
      return await handleSuccessResponse(response);
    }

    data = await response.json();

    throw new ApiError(response.status, data.message);
  };

  return withAuth ? appAuthFetch() : appFetch();
};
