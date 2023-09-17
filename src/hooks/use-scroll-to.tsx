import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material";

const HEADER_HEIGHT_DESKTOP = 112;
const HEADER_HEIGHT_MOBILE = 112;

export const useScrollTo = (options?: ScrollToOptions) => {
  const onMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const scrollTo = (element: HTMLElement | null) => {
    console.log(element);
    if (!element) return;

    const offset = onMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
      ...options,
    });
  };

  return scrollTo;
};
