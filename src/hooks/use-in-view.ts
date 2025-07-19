import { useCallback, useEffect, useRef, useState } from 'react';

export const useInView = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    setInView(target.isIntersecting);
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [handleObserver]);

  return { ref, inView };
};
