import { useEffect } from 'react';
import { useTimeout } from './use-timeout';

export const useDebounce = (callback: any, delay: number, dependencies: [any]): void => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(clear, []);
  useEffect(reset, [...dependencies, reset]);
};
