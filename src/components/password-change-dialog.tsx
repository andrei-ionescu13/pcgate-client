import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Divider } from './divider';

const schema = z
  .object({
    password: z.string(),
    newPassword: z.string().max(255),
    confirmNewPassword: z.string().max(255),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: 'Passwords must match',
    path: ['confirmNewPassword'],
  });

type FormValues = z.infer<typeof schema>;

interface PasswordChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const PasswordChangeDialog = ({
  open,
  onClose,
}: PasswordChangeDialogProps) => {
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
    resolver: zodResolver(schema),
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
