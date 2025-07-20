import type { DialogProps } from '@mui/material';
import { Dialog, DialogActions } from '@mui/material';
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
      <div className="px-4 pt-4">
        <h2 className="h3">{title}</h2>
      </div>
      <div className="flex-1 px-4 py-5">
        {children ||
          (content && <p className="text-text-secondary">{content}</p>)}
      </div>
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
