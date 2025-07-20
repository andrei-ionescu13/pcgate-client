import { cn } from '@/utils/cn';
import type { ComponentProps, FC } from 'react';

interface CardProps extends ComponentProps<'div'> {}

export const Card: FC<CardProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div
      className={cn(
        'shadow-card bg-paper overflow-hidden rounded-lg',
        className
      )}
      {...rest}
    />
  );
};
