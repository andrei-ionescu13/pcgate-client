import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import type { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { DialogAlert } from './dialog-alert';

interface FormValues {
  email: string;
}

interface EmailChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const EmailChangeDialog: FC<EmailChangeDialogProps> = (props) => {
  const { open, onClose } = props;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().max(255).email().required('Email is required'),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {};

  return (
    <DialogAlert
      onClose={onClose}
      open={open}
      title="Change Email"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <TextField
          {...register('email')}
          error={!!errors.email}
          fullWidth
          helperText={errors.email?.message}
          label="Email address"
          name="email"
          size="small"
          type="email"
        />
      </div>
    </DialogAlert>
  );
};
