import { FC, ReactNode } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import type { DialogProps } from '@mui/material';
import { Button } from './button';

export interface DialogAlertProps extends DialogProps {
  onClose: () => unknown;
  onSubmit: () => unknown;
  title: string;
  content?: string;
  children?: ReactNode;
  isLoading?: boolean;
  error?: boolean;
}

export const DialogAlert: FC<DialogAlertProps> = (props) => {
  const {
    open,
    children,
    content,
    error = false,
    isLoading = false,
    onClose,
    onSubmit,
    title,
    ...rest
  } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      {...rest}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {children || (content && (
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {content}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="text"
          color="white"
        >
          Cancel
        </Button>
        <Button
          autoFocus
          variant="contained"
          color={error ? 'error' : 'primary'}
          onClick={onSubmit}
          isLoading={isLoading}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
