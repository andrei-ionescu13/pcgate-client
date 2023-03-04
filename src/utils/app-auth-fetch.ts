import { ApiError } from './api-error';
import { NEXT_PUBLIC_API_ENDPOINT } from '../constants';
import { appFetch } from './app-fetch';
import { AUTH_ACCESS_TOKEN } from '@/constants/api';
import Router from 'next/router';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

const fetchAccesToken = async () => {
  const { response } = await appFetch(AUTH_ACCESS_TOKEN, undefined, true);
  if (!response.ok) {
    Router.push('/login')
    return;
  }
}

export const appAuthfetch = async (url: string, config: any = {}, fetchToken: false) => {
  const { headers, ...restConfig } = config;

  const finalConfig = {
    headers: {
      ...DEFAULT_HEADERS,
      ...headers
    },
    credentials: 'include',
    ...restConfig
  };

  try {
    let response = await fetch(`${NEXT_PUBLIC_API_ENDPOINT}${url}`, finalConfig);
    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      throw new ApiError(response.status, data.message);
    }

    if (response.ok) {
      return data;
    }

    throw new ApiError(response.status, data.message);
  } catch (error) {

  }

};
