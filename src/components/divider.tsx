import { cn } from '@/utils/cn';
import type { ComponentProps } from 'react';

interface DividerProps extends ComponentProps<'hr'> {}

export const Divider = ({ className, ...rest }: DividerProps) => {
  return (
    <hr
      className={cn('border-t-divider', className)}
      {...rest}
    />
  );
};
