import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import type { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Divider } from './divider';

interface FormValues {
  confirmNewPassword: string;
  newPassword: string;
  password: string;
}

interface PasswordChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const PasswordChangeDialog: FC<PasswordChangeDialogProps> = (props) => {
  const { open, onClose } = props;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      confirmNewPassword: '',
      newPassword: '',
      password: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        confirmNewPassword: Yup.string()
          .max(255)
          .oneOf([Yup.ref('newPassword')], 'Passwords must match')
          .required('Confirm new password is required'),
        newPassword: Yup.string().max(255).required('New password is required'),
        password: Yup.string().max(255).required('Old password is required'),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {};

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
    >
      <DialogTitle>Change Password</DialogTitle>
      <Divider />
      <DialogContent>
        <div className="mb-4">
          <TextField
            {...register('password')}
            error={!!errors.password}
            fullWidth
            helperText={errors.password?.message}
            label="Password"
            name="password"
            size="small"
            type="password"
          />
        </div>
        <div className="mb-4">
          <TextField
            {...register('newPassword')}
            error={!!errors.newPassword}
            fullWidth
            helperText={errors.newPassword?.message}
            label="New Password"
            name="newPassword"
            size="small"
            type="password"
          />
        </div>
        <div className="mb-4">
          <TextField
            {...register('newPassword')}
            error={!!errors.confirmNewPassword}
            fullWidth
            helperText={errors.confirmNewPassword?.message}
            label="Confirm Password"
            name="confirmNewPassword"
            size="small"
            type="confirmNewPassword"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};
