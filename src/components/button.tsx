import { cn } from '@/utils/cn';
import { CircularProgress } from '@mui/material';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, FC, Fragment } from 'react';

const button = cva(
  'inline-flex rounded-lg font-semibold text-sm items-center transition duration-150 ease-in-out gap-2 relative text-center',
  {
    variants: {
      variant: {
        default: 'hover:bg-white/5',
        contained: '',
        outlined: 'border border-white/50 hover:border-white hover:bg-white/5',
      },
      color: {
        primary: '',
        secondary: '',
        neutral: '',
        paper: 'bg-paper hover:bg-white/5',
      },
      size: {
        small: 'px-2.5 py-1',
        default: 'px-4 py-1.5',
        large: 'px-6 py-2.5',
      },
    },
    compoundVariants: [
      {
        variant: 'contained',
        color: 'primary',
        class:
          'bg-primary not-disabled:hover:bg-primary-dark disabled:bg-primary/50',
      },
      {
        variant: 'contained',
        color: 'secondary',
        class:
          'bg-secondary not-disabled:hover:bg-secondary-darker disabled:bg-secondary/50',
      },
      {
        variant: 'contained',
        color: 'neutral',
        class: 'bg-neutral not-disabled:hover:bg-[rgba(145,158,171,0.24)]',
      },
      {
        variant: 'outlined',
        color: 'primary',
        class:
          'border border-primary text-primary hover:border-primary not-disabled:hover:bg-[rgba(250,84,28,0.04)]',
      },
    ],
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'color'>,
    VariantProps<typeof button> {
  asChild?: boolean;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    variant,
    color,
    className,
    size,
    asChild,
    children,
    isLoading = false,
    disabled,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center text-white',
        button({ variant, color, size, className })
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {asChild ? (
        children
      ) : (
        <Fragment>
          {isLoading ? (
            <span className="invisible inline-flex items-center gap-2">
              {children}
            </span>
          ) : (
            children
          )}
          {isLoading && (
            <span className="absolute inset-0 z-10 inline-flex items-center justify-center">
              <CircularProgress
                size={24}
                color={'white'}
                thickness={4.2}
              />
            </span>
          )}
        </Fragment>
      )}
    </Comp>
  );
};
