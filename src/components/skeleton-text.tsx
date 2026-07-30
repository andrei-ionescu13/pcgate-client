import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

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
      body2: 'h-6.5 [&_div]:h-1/2',
      h4: 'h-9 [&_div]:h-1/2',
    },
  },
  defaultVariants: {
    animation: 'pulse',
    text: 'body2',
  },
});

export const SkeletonText = ({ animation, text, className }: SkeletonProps) => {
  return (
    <div className={cn(skeleton({ animation, text, className }))}>
      <div className="bg-skeleton flex-1 rounded-lg" />
    </div>
  );
};
