import type { FC } from 'react';
import './spinner.scss';

interface SpinnerProps {}

export const Spinner: FC<SpinnerProps> = (props) => {
  return <span className="loader"></span>;
};
