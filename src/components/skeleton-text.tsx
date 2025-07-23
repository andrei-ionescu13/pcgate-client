import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import type { FC } from 'react';

interface SkeletonProps extends VariantProps<typeof skeleton> {
  className?: string;
}

const skeleton = cva('flex items-center', {
  variants: {
    animation: {
      pulse: 'animate-pulse',
      false: '',
    },
    text: {
      body2: 'h-[26px] [&_div]:h-1/2',
    },
  },
  defaultVariants: {
    animation: 'pulse',
    text: 'body2',
  },
});

export const SkeletonText: FC<SkeletonProps> = (props) => {
  const { animation, text, className } = props;

  return (
    <div className={cn(skeleton({ animation, text, className }))}>
      <div className="bg-skeleton flex-1 rounded-lg" />
    </div>
  );
};
