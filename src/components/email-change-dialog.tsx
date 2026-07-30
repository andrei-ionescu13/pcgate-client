import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { DialogAlert } from './dialog-alert';

const schema = z.object({
  email: z.email().max(255),
});

type FormValues = z.infer<typeof schema>;

interface EmailChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const EmailChangeDialog = ({
  open,
  onClose,
}: EmailChangeDialogProps) => {
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
    resolver: zodResolver(schema),
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
