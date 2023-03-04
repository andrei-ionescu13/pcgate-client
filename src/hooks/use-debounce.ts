import { useEffect } from 'react';
import { useTimeout } from './use-timeout';

export const useDebounce = (callback: any, delay: number, dependencies: unknown[]): void => {
  const { reset } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
};
