import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

interface SkeletonProps extends VariantProps<typeof skeleton> {
  className?: string;
}

const skeleton = cva('bg-skeleton w-full h-full rounded-lg', {
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

export const Skeleton = ({ animation, className, variant }: SkeletonProps) => {
  return <div className={cn(skeleton({ animation, variant, className }))} />;
};
