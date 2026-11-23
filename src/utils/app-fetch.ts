import { ApiError } from './api-error';

const isServer = typeof window === 'undefined';
const apiUrl = process.env.NEXT_PUBLIC_API_PATH!;

type QueryValue =
  string | number | boolean | null | undefined | (string | number)[];

type Query = Record<string, QueryValue>;

type ResponseType = 'json' | 'blob' | 'response' | 'no-content';

type AppFetchOptions = {
  url: string;
  config?: RequestInit;
  query?: Query;
  withAuth?: boolean;
  responseType?: ResponseType;
};

type ResponseData<T, R extends ResponseType> = R extends 'blob'
  ? Blob
  : R extends 'response'
    ? Response
    : R extends 'no-content'
      ? void
      : T;

const buildQueryString = (query: Query): string => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, String(item)));
    } else {
      params.append(key, String(value));
    }
  });

  return params.toString();
};

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = await response.json();
    return data.message ?? response.statusText ?? 'Request failed';
  } catch {
    return response.statusText || 'Request failed';
  }
};

const getCookies = async (): Promise<string | undefined> => {
  if (!isServer) return undefined;

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return cookieStore.toString();
};

const executeRequest = async (
  url: string,
  config: RequestInit,
  query?: Query
): Promise<Response> => {
  const headers = new Headers(config.headers);

  if (!headers.has('Content-Type') && !(config.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const cookies = await getCookies();

  if (cookies) {
    headers.set('Cookie', cookies);
  }

  const queryString = query ? buildQueryString(query) : '';

  return fetch(`${apiUrl}${url}${queryString ? `?${queryString}` : ''}`, {
    ...config,
    headers,
    credentials: 'include',
  });
};

const refreshAccessToken = async (): Promise<void> => {
  const response = await executeRequest('/access-token', {});

  if (!response.ok) {
    throw new ApiError(response.status, await getErrorMessage(response));
  }
};

const redirectToLogin = async (): Promise<never> => {
  if (isServer) {
    const { redirect } = await import('next/navigation');
    redirect('/login');
  }

  window.location.replace('/login');

  throw new Error('Redirecting to login');
};

const parseResponse = async <T, R extends ResponseType>(
  response: Response,
  responseType: R
): Promise<ResponseData<T, R>> => {
  switch (responseType) {
    case 'blob':
      return (await response.blob()) as ResponseData<T, R>;

    case 'response':
      return response as ResponseData<T, R>;

    case 'no-content':
      return undefined as ResponseData<T, R>;

    case 'json': {
      const text = await response.text();

      return (text ? JSON.parse(text) : {}) as ResponseData<T, R>;
    }
  }
};

const handleResponse = async <T, R extends ResponseType>(
  response: Response,
  responseType: R
): Promise<ResponseData<T, R>> => {
  if (!response.ok) {
    throw new ApiError(response.status, await getErrorMessage(response));
  }

  return parseResponse<T, R>(response, responseType);
};

// Overloads

export function appFetch<T = unknown>(
  options: AppFetchOptions & { responseType?: 'json' }
): Promise<T>;

export function appFetch(
  options: AppFetchOptions & { responseType: 'blob' }
): Promise<Blob>;

export function appFetch(
  options: AppFetchOptions & { responseType: 'response' }
): Promise<Response>;

export function appFetch(
  options: AppFetchOptions & { responseType: 'no-content' }
): Promise<void>;

// Implementation

export async function appFetch<T = unknown>({
  url,
  config = {},
  query,
  withAuth = false,
  responseType = 'json',
}: AppFetchOptions): Promise<T | Blob | Response | void> {
  const request = () => executeRequest(url, config, query);

  let response = await request();

  if (response.status === 401 && withAuth) {
    try {
      await refreshAccessToken();
    } catch {
      return redirectToLogin();
    }

    response = await request();

    if (response.status === 401) {
      return redirectToLogin();
    }
  }

  return handleResponse<T, ResponseType>(response, responseType);
}
