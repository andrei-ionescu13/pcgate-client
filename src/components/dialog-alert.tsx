import type { DialogProps } from '@mui/material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { FC, ReactNode } from 'react';
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
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      {...rest}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children ||
          (content && <p className="text-text-secondary">{content}</p>)}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          autoFocus
          variant="contained"
          color="primary"
          onClick={onSubmit}
          isLoading={isLoading}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
