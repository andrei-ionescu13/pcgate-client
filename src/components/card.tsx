import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

interface CardProps
  extends Omit<ComponentProps<'div'>, 'color'>,
    VariantProps<typeof card> {}

const card = cva(' bg-paper overflow-hidden rounded-lg', {
  variants: {
    variant: {
      elevation: 'shadow-card',
      outlined: 'border border-divider',
      default: '',
    },
    color: {
      paper: 'bg-paper',
      default: 'bg-default',
      neutral: 'bg-neutral',
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'paper',
  },
});

export const Card = ({ variant, color, className, ...rest }: CardProps) => {
  return (
    <div
      className={cn(card({ variant, color, className }))}
      {...rest}
    />
  );
};
