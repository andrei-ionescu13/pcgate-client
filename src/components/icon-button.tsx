import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

const button = cva(
  'inline-flex rounded-full items-center transition duration-150 ease-in-out gap-2 relative hover:bg-white/5 disabled:opacity-40',
  {
    variants: {
      size: {
        small: 'p-1 max-h-9 [&>svg]:w-4 [&>svg]:h-4',
        default: 'p-2 ',
        large: 'p-3',
      },
    },

    defaultVariants: {
      size: 'default',
    },
  }
);

export interface IconButtonProps
  extends Omit<ComponentProps<'button'>, 'color'>,
    VariantProps<typeof button> {}

export const IconButton = ({ className, size, ...rest }: IconButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center text-white',
        button({ size, className })
      )}
      type="button"
      {...rest}
    />
  );
};
