'use client';

import { Button } from '@/components/button';
import { GoogleAuthButton } from '@/components/google-auth-button';
import { IconButton } from '@/components/icon-button';
import { useAuth } from '@/contexts/auth-context';
import { Link, useRouter } from '@/i18n/navigation';
import { Eye as EyeIcon } from '@/icons/eye';
import { EyeSlash as EyeSlashIcon } from '@/icons/eye-slash';
import { ApiError } from '@/utils/api-error';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, InputAdornment, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AuthLayout } from 'layout/auth/AuthLayout';
import Head from 'next/head';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const mutation = useMutation<
    void,
    ApiError,
    { email: string; password: string }
  >({
    mutationFn: login,
  });
  const { refresh, push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: 'gegag51027@7tul.com',
      password: 'Masinarie1',
    },
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().email().max(255).required(),
        password: Yup.string().max(255).required(),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setError('root.serverError', {
      type: 'server',
      message: '',
    });

    mutation.mutate(values, {
      onSuccess: () => {
        push('/');
        refresh();
      },
      onError: (error) => {
        setError('root.serverError', {
          type: 'server',
          message: error.message,
        });
      },
    });
  };

  const handleShowPasswordChange = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <AuthLayout text="Hi, Welcome Back">
        <div>
          <div className="mb-10">
            <h3 className="mb-1">Login</h3>
            <p className="body2 text-text-secondary">
              Don’t have an account?{' '}
              <Link
                href="/register"
                className="hover:underline"
              >
                Get Started
              </Link>
            </p>
          </div>
          <div className="flex gap-4">
            <GoogleAuthButton />
          </div>
          <div className="flex items-center">
            <p className="text-text-secondary body2 before:bg-dark-grey after:bg-dark-grey relative my-5 flex-1 text-center before:absolute before:top-2/4 before:left-0 before:block before:h-0.25 before:w-[45%] before:content-[''] after:absolute after:top-2/4 after:right-0 after:block after:h-0.25 after:w-[45%] after:content-['']">
              OR
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
            <TextField
              {...register('password')}
              fullWidth
              id="password"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              label="Password"
              name="password"
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPasswordChange}
                      size="small"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="text-secondary" />
                      ) : (
                        <EyeIcon className="text-secondary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="flex content-end">
              <Link
                href="/password-recovery"
                className="text-text-secondary body2 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              isLoading={mutation.isPending}
            >
              Login
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
}
