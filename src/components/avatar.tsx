import { User as UserIcon } from '@/icons/user';
import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

interface AvatarProps
  extends ComponentProps<'div'>,
    VariantProps<typeof avatar> {}

const avatar = cva(
  'rounded-full overflow-hidden relative bg-grey-600 inline-flex justify-center items-center text-grey-900',
  {
    variants: {
      size: {
        small: 'w-8 h-8',
        default: 'w-10 h-10',
        large: 'w-12 h-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export const Avatar: FC<AvatarProps> = (props) => {
  const { size, className, children, ...rest } = props;

  return (
    <div className={cn(avatar({ size, className }))}>
      {children ? children : <UserIcon />}
    </div>
  );
};
