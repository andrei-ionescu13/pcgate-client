"use client"

import { useState, type ChangeEvent, type FC } from 'react';
import { Box, InputBase } from '@mui/material';
import type { InputBaseProps, InputBaseComponentProps } from '@mui/material';
import { styled } from '@mui/system';
import type { SxProps } from '@mui/system';
import { Search as SearchIcon } from '@/icons/search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SearchInputProps extends InputBaseProps {
  inputProps?: InputBaseComponentProps;
  placeholder?: string;
  sx?: SxProps;
}

const SearchInputRoot = styled(InputBase)(
  ({ theme }) => ({
    alignItems: 'center',
    borderRadius: 6,
    display: 'flex',
    padding: theme.spacing(0.5, 1),
    width: '100%',
    borderColor: theme.palette.divider,
    flex: 1,
    backgroundColor: 'rgb(28,33,41)',
  }));

export const SearchParam: FC<SearchInputProps> = (props) => {
  const [keyword, setKeyword] = useState('');
  const { placeholder = 'Search...', inputProps, ...rest } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams);

    if (keyword) {
      params.set('keyword', keyword);
    } else {
      params.delete('keyword');
    }

    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  }

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  return (
    <form onSubmit={handleSearch}>
      <SearchInputRoot
        endAdornment={<SearchIcon sx={{ color: (theme) => theme.palette.text.secondary }} />}
        inputProps={{
          onChange: handleKeywordChange,
          sx: {
            mr: 1,
            fontSize: 14,
          },
          value: keyword,
          ...inputProps
        }}
        placeholder={placeholder}
        {...rest}
      />
    </form>
  );
};