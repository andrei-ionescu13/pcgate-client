'use client';
import { Search as SearchIcon } from '@/icons/search';
import { cn } from '@/utils/cn';
import type { InputBaseComponentProps } from '@mui/material';
import type { FC } from 'react';
import { InputBase, InputBaseProps } from './input-base';

interface SearchProps extends InputBaseProps {
  inputProps?: InputBaseComponentProps;
  placeholder?: string;
  value: string;
}

export const Search: FC<SearchProps> = (props) => {
  const {
    placeholder = 'Search...',
    value,
    inputProps,
    className,
    ...rest
  } = props;

  return (
    <InputBase
      className={cn('w-full bg-[rgb(28,33,41)]', className)}
      endAdornment={
        <SearchIcon sx={{ color: (theme) => theme.palette.text.secondary }} />
      }
      value={value}
      placeholder={placeholder}
      {...rest}
    />
  );
};
