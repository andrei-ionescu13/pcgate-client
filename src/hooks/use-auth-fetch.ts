/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
};

const getNewAccesToken = async (refreshToken: string): Promise<string> => {
  const res = await fetch('http://localhost:3003/auth/access-token', {
    headers: {
      'refresh-token': refreshToken
    }
  });
  const { accessToken } = await res.json();
  window.localStorage.setItem('accessToken', accessToken);

  return accessToken;
};

export const useAuthFetch = <T>(initialUrl: string, initialOptions = {}, dependencies: any[] = [], runOnRender = true, shouldRun = true): [T | undefined, boolean, any] => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(runOnRender && shouldRun);
  const [error, setError] = useState();
  const [data, setData] = useState<T | undefined>();

  const redirectToLogin = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const run = useCallback(async (url = initialUrl, options = initialOptions): Promise<{ loading: boolean; error: any; data: T | undefined } | undefined> => {
    try {
      setLoading(true);
      setError(undefined);
      setData(undefined);

      let accessToken = window.localStorage.getItem('accessToken');
      const refreshToken = window.localStorage.getItem('refreshToken');

      if (!accessToken) {
        redirectToLogin();
        return;
      }

      let respose = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${url}`, { ...DEFAULT_OPTIONS, ...options, headers: { 'access-token': `Bearer ${accessToken}`, 'Content-Type': 'application/json' } });

      if (respose.status === 401) {
        if (refreshToken) {
          accessToken = await getNewAccesToken(refreshToken);
          respose = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${url}`, { ...DEFAULT_OPTIONS, ...options, headers: { 'access-token': `Bearer ${accessToken}`, 'Content-Type': 'application/json' } });

          if (!respose.ok) {
            redirectToLogin();
            return;
          }
        } else {
          redirectToLogin();
          return;
        }
      }

      const data = await respose.json();

      if (respose.ok) {
        setData(data);
        setLoading(false);
        return {
          loading: false,
          error: undefined,
          data
        };
      }

      setError(data);
      setLoading(false);

      return {
        loading: false,
        error: data,
        data: undefined
      };
    } catch (error) {
      setLoading(false);
      setError(error);
      setData(undefined);
    }
  }, dependencies
  );

  useEffect(() => {
    if (runOnRender) {
      run();
    }
  }, [run, runOnRender]);

  return [data, loading, error];
};
