'use client';

import { cn } from '@/utils/cn';
import type { InputBaseComponentProps } from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { InputBase, type InputBaseProps } from './input-base';

interface SearchProps extends InputBaseProps {
  inputProps?: InputBaseComponentProps;
  placeholder?: string;
  value: string;
}

export const Search = ({
  placeholder = 'Search...',
  value,
  inputProps,
  className,
  ...rest
}: SearchProps) => {
  return (
    <InputBase
      className={cn('w-full bg-[rgb(28,33,41)]', className)}
      endAdornment={<SearchIcon className="text-text-secondary" />}
      value={value}
      placeholder={placeholder}
      {...rest}
    />
  );
};
