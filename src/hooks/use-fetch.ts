/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect, useCallback } from 'react';

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
};

export const useFetch = <T>(initialUrl: string, initialOptions = {}, dependencies: any[] = [], runOnRender = true, shouldRun = true): [T | undefined, boolean, any, any] => {
  const [loading, setLoading] = useState(runOnRender && shouldRun);
  const [error, setError] = useState();
  const [data, setData] = useState<T | undefined>();

  const run = useCallback(async (url = initialUrl, options = initialOptions): Promise<void> => {
    try {
      setLoading(true);
      setError(undefined);
      setData(undefined);

      const respose = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${url}`, { ...DEFAULT_OPTIONS, ...options });
      const data = await respose.json();

      if (respose.ok) {
        setData(data);
        setLoading(false);
      }

      setError(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      setData(undefined);
    }
  }, dependencies
  );

  const reset = () => {
    setLoading(runOnRender && shouldRun);
    setError(undefined);
    setData(undefined);
  };

  useEffect(() => {
    if (runOnRender && shouldRun) {
      run();
    }
  }, [run, runOnRender, shouldRun]);

  return [data, loading, error, reset];
};
