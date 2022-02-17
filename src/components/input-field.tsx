import type { FC, ChangeEvent } from 'react';
import { Box, Typography, InputBase } from '@mui/material';
import type { InputBaseProps } from '@mui/material';
import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';

interface InputFieldProps extends InputBaseProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  sx?: SxProps;
  value: string;
  label?: string;
  helperText?: string | false | undefined;
  error?: boolean;
}

export const InputField: FC<InputFieldProps> = (props) => {
  const { onChange, placeholder, value, label, helperText, error, ...other } = props;

  return (
    <Box>
      {label && (
        <Typography
          color="textPrimary"
          sx={{ mb: 1 }}
          variant="body2"
        >
          {label}
        </Typography>
      )}
      <InputBase
        inputProps={{
          sx: {
            boxShadow: (theme: Theme) => error ? `0px 0px 0px 2px ${theme.palette.error.main}` : '0px 0px 0px 1px rgba(0, 0 ,0 , 0.2)',
            borderRadius: 1,
            fontSize: 12,
            px: 1.5,
            py: 0.75,
            '&:invalid': {
              boxShadow: '0 0 10px rgba(0, 0 ,0 , 0.2)'
            },
            '&:focus': {
              boxShadow: (theme: Theme) => error ? `0px 0px 0px 2px ${theme.palette.error.main}` : `0px 0px 0px 2px ${theme.palette.primary.main}`
            }
          },
          onChange,
          value
        }}
        placeholder={placeholder}
        sx={{
          backgroundColor: 'transparent',
          flex: 1
        }}
        {...other}
      />
      {helperText && (
        <Typography
          sx={{
            color: error ? 'error.main' : '#000',
            fontSize: 12,
            mt: 0.5
          }}
          variant="body2"
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};