//@ts-nocheck
import jwtDecode from 'jwt-decode';
import { ApiError } from './api-error';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

const redirectToLogin = () => {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

const getNewAccesToken = async (refreshToken: string): Promise<string | void> => {
  const response = await fetch('http://localhost:3003/auth/access-token', {
    headers: {
      'refresh-token': refreshToken
    }
  });

  if (!response.ok) {
    redirectToLogin();
    return;
  }

  const { accessToken } = await response.json();
  window.localStorage.setItem('accessToken', accessToken);

  return accessToken;
};

export const appAuthfetch = async (url: string, config: any = {}) => {
  const { headers, ...restConfig } = config;
  const refreshToken = window.localStorage.getItem('refreshToken');
  let accessToken = window.localStorage.getItem('accessToken');

  if (!accessToken && !refreshToken) {
    redirectToLogin();
    return;
  }

  if (!Boolean(accessToken) || jwtDecode(accessToken).exp * 1000 < Date.now()) {
    if (Boolean(refreshToken) && jwtDecode(refreshToken).exp * 1000 > Date.now()) {
      accessToken = await getNewAccesToken(refreshToken);
    } else {
      redirectToLogin();
      return;
    }
  }

  const finalConfig = {
    headers: {
      ...DEFAULT_HEADERS,
      'access-token': `Bearer ${accessToken}`,
      ...headers
    },
    ...restConfig
  };


  let response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${url}`, finalConfig);

  if (response.status === 401) {
    redirectToLogin();
    return;
  }

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new ApiError(response.status, data.message);
};
