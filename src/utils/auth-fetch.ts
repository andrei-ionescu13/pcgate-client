//@ts-nocheck
import jwtDecode from 'jwt-decode';
import { ApiError } from './api-error';
import { NEXT_PUBLIC_API_ENDPOINT } from '/constants';

const getNewAccesToken = async (refreshToken: string | null): Promise<string> => {
  const respose = await fetch(`${NEXT_PUBLIC_API_ENDPOINT}/auth/access-token`, {
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
  const refreshToken = window.localStorage.getItem('refreshToken');

  let respose = await fetch(`${NEXT_PUBLIC_API_ENDPOINT}${url}`, {
    ...options,
    headers: {
      'access-token': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (respose.status === 401) {
    accessToken = await getNewAccesToken(refreshToken);
    respose = await fetch(`${NEXT_PUBLIC_API_ENDPOINT}${url}`, {
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