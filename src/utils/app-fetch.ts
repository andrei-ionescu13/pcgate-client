import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { ApiError } from './api-error';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const isServer = typeof window === 'undefined';
const apiUrl = process.env.NEXT_PUBLIC_API_PATH;

const buildQueryString = (query: Record<string, any>): string => {
  const finalQuery: URLSearchParams = new URLSearchParams();

  Object.keys(query).forEach((key) => {
    if (Array.isArray(query[key])) {
      query[key].forEach((item) => finalQuery.append(key, item));
    } else finalQuery.append(key, query[key]);
  });

  return finalQuery.toString();
};

export const getNewAccesToken = async (): Promise<string> => {
  const respose = await fetch(`${apiUrl}/access-token`, {
    credentials: 'include',
  });
  const data = await respose.json();

  if (respose.ok) {
    return data;
  }

  throw new ApiError(respose.status, data.message);
};

type ReturnType<T> = T extends Blob ? Blob : T;

export const appFetch = async <T>({
  url,
  config = {},
  query = undefined,
  withAuth = false,
  responseType = 'json',
}: {
  url: string;
  config?: RequestInit;
  query?: Record<string, any>;
  withAuth?: boolean;
  responseType?: string;
  shouldRedirect?: boolean;
}): Promise<ReturnType<T>> => {
  const { headers = {}, ...restConfig } = config;
  let cookieStore: ReadonlyRequestCookies | undefined;

  if (isServer) {
    const { cookies } = await import('next/headers');
    cookieStore = await cookies();
  }

  const request = () =>
    fetch(`${apiUrl}${url}${query ? `?${buildQueryString(query)}` : ''}`, {
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
        ...(isServer && cookieStore && { Cookie: cookieStore.toString() }),
      },
      ...restConfig,
      credentials: 'include',
    });

  const handleSuccessResponse = async (response: any) => {
    if (responseType === 'json') {
      let data: any = await response.text();
      data = data ? JSON.parse(data) : {};

      return data;
    }

    if (responseType === 'blob') {
      const data = await response.blob();
      return data as ReturnType<T>;
    }
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

    try {
      await getNewAccesToken();
    } catch (error) {
      if (isServer) {
        const { redirect } = await import('next/navigation');
        redirect('/login');
        return;
      }
      window.location.replace('/login');
      return;
    }

    response = await request();

    if (response.ok) {
      return await handleSuccessResponse(response);
    }

    data = await response.json();

    if (response.status === 401) {
      if (isServer) {
        const { redirect } = await import('next/navigation');
        redirect('/login');
        return;
      }
      window.location.replace('/login');
    }

    throw new ApiError(response.status, data.message);
  };

  return withAuth ? appAuthFetch() : appFetch();
};
