import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: any, delay: number): { reset: () => void; clear: () => void; } => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
};
