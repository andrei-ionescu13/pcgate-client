import { useState, useEffect, useRef } from 'react';
import type { Dispatch, SetStateAction, RefObject } from 'react';

export const useFocused = (initialFocused = false): [RefObject<HTMLDivElement>, boolean, Dispatch<SetStateAction<boolean>>] => {
  const [focused, setFocused] = useState(initialFocused);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialFocused) {
      ref?.current?.focus();
    }
  }, [initialFocused])

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return [ref, focused, setFocused];
};