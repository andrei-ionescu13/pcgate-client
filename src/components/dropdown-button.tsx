import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps, FC } from 'react';

interface ListButtonProps extends ComponentProps<'button'> {
  asChild?: boolean;
}

export const ListButton: FC<ListButtonProps> = (props) => {
  const { className, asChild = false, ...rest } = props;

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex w-full px-4 py-2 hover:bg-[rgba(145,158,171,0.08)]',
        className
      )}
      {...rest}
    />
  );
};
