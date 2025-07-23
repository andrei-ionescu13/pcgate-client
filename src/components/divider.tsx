import { cn } from '@/utils/cn';
import type { ComponentProps, FC } from 'react';

interface DividerProps extends ComponentProps<'hr'> {}

export const Divider: FC<DividerProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <hr
      className={cn('border-t-divider', className)}
      {...rest}
    />
  );
};
