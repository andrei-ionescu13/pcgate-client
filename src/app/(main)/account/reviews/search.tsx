"use client"
import { FormEvent, useState, type ChangeEvent, type FC } from 'react';
import { Box, InputBase } from '@mui/material';
import type { InputBaseProps, InputBaseComponentProps } from '@mui/material';
import { styled } from '@mui/system';
import type { SxProps } from '@mui/system';
import { Search as SearchIcon } from '@/icons/search';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

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

export const Search: FC<SearchInputProps> = (props) => {
  const { placeholder = 'Search...', inputProps, ...rest } = props;
  const [value, setValue] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('keyword', value);
    } else {
      params.delete('keyword');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <SearchInputRoot
        endAdornment={<SearchIcon sx={{ color: (theme) => theme.palette.text.secondary }} />}
        inputProps={{
          onChange: handleChange,
          sx: {
            mr: 1,
            fontSize: 14,
          },
          value,
          ...inputProps
        }}
        placeholder={placeholder}
        {...rest}
      />
    </form >
  );
};