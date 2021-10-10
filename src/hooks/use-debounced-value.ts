import { useState } from 'react';
import { useDebounce } from './use-debounce';

export const useDebouncedValue = (value: any, delay: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useDebounce(() => setDebouncedValue(value), delay, [value]);

  return [debouncedValue, setDebouncedValue];
};
