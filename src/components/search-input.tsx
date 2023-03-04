import type { ChangeEvent, FC } from 'react';
import { Box, InputBase } from '@mui/material';
import type { InputBaseProps, InputBaseComponentProps } from '@mui/material';
import { styled } from '@mui/system';
import type { SxProps } from '@mui/system';
import { Search as SearchIcon } from '@/icons/search';

interface SearchInputProps extends InputBaseProps {
  inputProps?: InputBaseComponentProps;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  sx?: SxProps;
  value: string;
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

export const SearchInput: FC<SearchInputProps> = (props) => {
  const { onChange, placeholder = 'Search...', value, inputProps, ...rest } = props;

  return (
    <SearchInputRoot
      endAdornment={<SearchIcon sx={{ color: (theme) => theme.palette.text.secondary }} />}
      inputProps={{
        onChange,
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
  );
};