'use client';

import { Button } from '@/components/button';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from '@/i18n/navigation';
import { ApiError } from '@/utils/api-error';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AuthLayout } from 'layout/auth/AuthLayout';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface FormValues {
  password: string;
  confirmPassword: string;
}

const PasswordReset = () => {
  const { passwordReset } = useAuth();
  const mutation = useMutation<
    void,
    ApiError,
    { userId: string; token: string; password: string; confirmPassword: string }
  >({ mutationFn: passwordReset });
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        confirmPassword: Yup.string()
          .max(255)
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm password is required'),
        password: Yup.string().min(8).max(255).required('Password is required'),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setError('root.serverError', {
      type: 'server',
      message: '',
    });

    if (
      !token ||
      typeof token !== 'string' ||
      !userId ||
      typeof userId !== 'string'
    )
      return;
    mutation.mutate(
      { ...values, token: token, userId: userId },
      {
        onSuccess: () => {
          router.push('/login');
        },
        onError: (error) => {
          setError('root.serverError', {
            type: 'server',
            message: error.message,
          });
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Password Reset</title>
      </Head>
      <AuthLayout>
        <div>
          <div className="mb-10">
            <h3 className="mb-1">Password Reset</h3>
            <p className="body2 text-text-secondary">Choose a new password</p>
          </div>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register('password')}
              error={!!errors.password}
              fullWidth
              helperText={errors.password?.message}
              label="Password"
              name="password"
              type="password"
              variant="filled"
            />
            <TextField
              {...register('confirmPassword')}
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="filled"
            />
            <Button
              color="primary"
              isLoading={mutation.isPending}
              size="large"
              type="submit"
              variant="contained"
            >
              Update
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

export default PasswordReset;
