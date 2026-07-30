'use client';

import { Button } from '@/components/button';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from '@/i18n/navigation';
import { AuthLayout } from '@/layout/auth/AuthLayout';
import { ApiError } from '@/utils/api-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormHelperText, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

const schema = z
  .object({
    password: z.string().max(255),
    confirmPassword: z.string().max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords must match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

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
    resolver: zodResolver(schema),
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
