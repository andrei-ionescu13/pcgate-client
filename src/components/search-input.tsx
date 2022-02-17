import type { ChangeEvent, FC } from 'react';
import { InputBase } from '@mui/material';
import type { InputBaseProps, InputBaseComponentProps } from '@mui/material';
import { styled } from '@mui/system';
import type { SxProps } from '@mui/system';
import { Search as SearchIcon } from '../icons/search';

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
    backgroundColor: '#fff',
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    padding: theme.spacing(0.5, 1),
    width: '100%',
    borderColor: theme.palette.divider
  }));

export const SearchInput: FC<SearchInputProps> = (props) => {
  const { onChange, placeholder = 'Search...', value, inputProps, ...other } = props;

  return (
    <SearchInputRoot
      endAdornment={<SearchIcon sx={{ color: '#0B182D' }} />}
      inputProps={{
        onChange,
        sx: {
          color: '#000',
          mr: 1,
          fontSize: 14,
        },
        value,
        ...inputProps
      }}
      placeholder={placeholder}
      sx={{
        backgroundColor: '#fff',
        flex: 1
      }}
      {...other}
    />
  );
};