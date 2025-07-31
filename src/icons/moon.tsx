import { ComponentProps, FC } from 'react';

export const Moon: FC<ComponentProps<'svg'>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    width={24}
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);
