import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import type { FC, ReactNode } from 'react';

interface BadgeProps extends VariantProps<typeof badge> {
  content: string | number;
  children: ReactNode;
  className?: string;
}

const badge = cva(
  'caption absolute -top-2.5 -right-2.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-center',
  {
    variants: {
      color: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        default: 'bg-white text-black',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  }
);

export const Badge: FC<BadgeProps> = (props) => {
  const { children, content, color, className } = props;

  return (
    <div className="relative">
      {!!content && (
        <span className={cn(badge({ color, className }))}>{content}</span>
      )}
      {children}
    </div>
  );
};
