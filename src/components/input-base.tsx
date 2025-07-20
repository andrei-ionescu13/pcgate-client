import { cn } from '@/utils/cn';
import { ComponentProps, FC, ReactNode, useRef } from 'react';

export interface InputBaseProps extends ComponentProps<'input'> {
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

export const InputBase: FC<InputBaseProps> = (props) => {
  const { endAdornment, startAdornment, className, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'body2 inline-flex cursor-text gap-2 rounded-md px-2 py-1',
        className
      )}
    >
      {!!startAdornment && <span>{startAdornment}</span>}
      <input
        ref={inputRef}
        className="min-w-0 flex-1 border-none outline-none focus:ring-0 focus:outline-none"
        {...rest}
      />
      {!!endAdornment && <span>{endAdornment}</span>}
    </div>
  );
};
