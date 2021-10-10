//@ts-nocheck
import { ApiError } from './api-error';

const getNewAccesToken = async (refreshToken: string | null): Promise<string> => {
  const respose = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/access-token`, {
    headers: {
      'refresh-token': refreshToken
    }
  });
  const data = await respose.json();

  if (!respose.ok) {
    throw new ApiError(respose.status, data.message);
  }

  const { accessToken } = data;
  window.localStorage.setItem('accessToken', accessToken);
  return accessToken;
};

export const authFetch = async <T>(url: string, options = {}): Promise<T> => {
  let accessToken = window.localStorage.getItem('accessToken');
  const refreshToken: string | null = window.localStorage.getItem('refreshToken');

  let respose = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${url}`, {
    ...options,
    headers: {
      'access-token': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (respose.status === 401) {
    accessToken = await getNewAccesToken(refreshToken);
    respose = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${url}`, {
      ...options,
      headers: {
        'access-token': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await respose.json();
    if (respose.ok) {
      return data;
    }
    throw new ApiError(respose.status, data.message);
  }

  const text = await respose.text();
  const data = text ? JSON.parse(text) : {};

  if (respose.ok) {
    return data;
  }

  throw new ApiError(respose.status, data.message);
};