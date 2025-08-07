'use client';
import { Button } from '@/components/button';
import { useAuth } from '@/contexts/auth-context';
import { ApiError } from '@/utils/api-error';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AuthLayout } from 'layout/auth/AuthLayout';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as Yup from 'yup';

interface FormValues {
  email: string;
}

const PasswordRecovery = () => {
  const { requestPasswordReset } = useAuth();
  const mutation = useMutation<void, ApiError, string>({
    mutationFn: requestPasswordReset,
  });

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

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setError('root.serverError', {
      type: 'server',
      message: '',
    });

    mutation.mutate(values.email, {
      onSuccess: () => {
        toast.success('A reset link has been sent to your email');
      },
      onError: (error) => {
        setError('root.serverError', {
          type: 'server',
          message: error.message,
        });
      },
    });
  };

  return (
    <>
      <Head>
        <title>Password Recovery</title>
      </Head>
      <AuthLayout>
        <div>
          <div className="mb-10">
            <h3 className="mb-1">Password Recovery</h3>
            <p className="body2 text-text-secondary">
              We&apos;ll send a password setup link to your account&apos;s email
              address.
            </p>
          </div>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register('email')}
              error={!!errors.email}
              fullWidth
              helperText={errors.email?.message}
              label="Email address"
              name="email"
              type="email"
              variant="filled"
            />
            <Button
              color="primary"
              isLoading={mutation.isPending}
              type="submit"
              size="large"
              variant="contained"
            >
              Reset
            </Button>
            {!!errors.root?.serverError && (
              <FormHelperText error>
                {errors.root.serverError.message}
              </FormHelperText>
            )}
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default PasswordRecovery;
