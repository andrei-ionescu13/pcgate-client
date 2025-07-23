import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import type { FC } from 'react';

interface SkeletonProps extends VariantProps<typeof skeleton> {
  className?: string;
}

const skeleton = cva('bg-skeleton', {
  variants: {
    variant: {
      circular: 'rounded-full',
      rectangular: '',
    },
    animation: {
      pulse: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'rectangular',
    animation: 'pulse',
  },
});

export const Skeleton: FC<SkeletonProps> = (props) => {
  const { animation, className, variant } = props;

  return <div className={cn(skeleton({ animation, variant, className }))} />;
};
