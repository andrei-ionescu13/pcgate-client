import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

const container = cva('mx-auto', {
  variants: {
    maxWidth: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    },
    disableGutters: {
      true: 'px-0',
      false: 'px-4 sm:px-6',
    },
    defaultVariants: {
      disableGutters: false,
    },
  },
});

interface ContainerProps
  extends ComponentProps<'div'>,
    VariantProps<typeof container> {}

export const Container = ({
  className,
  maxWidth,
  disableGutters = false,
  ...rest
}: ContainerProps) => {
  return (
    <div
      className={cn(container({ maxWidth, disableGutters, className }))}
      {...rest}
    />
  );
};
