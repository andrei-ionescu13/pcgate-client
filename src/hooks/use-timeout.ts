'use client';

import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): { start: () => void; reset: () => void; clear: () => void } => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const start = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return clear;
  }, [delay, start, clear]);

  const reset = useCallback(() => {
    clear();
    start();
  }, [clear, start]);

  return { start, reset, clear };
};
