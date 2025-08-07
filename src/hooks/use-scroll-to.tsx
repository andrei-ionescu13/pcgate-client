const HEADER_HEIGHT = 112;

export const useScrollTo = (options?: ScrollToOptions) => {
  const scrollTo = (element: HTMLElement | null) => {
    if (!element) return;

    const offset = HEADER_HEIGHT;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
      ...options,
    });
  };

  return scrollTo;
};
