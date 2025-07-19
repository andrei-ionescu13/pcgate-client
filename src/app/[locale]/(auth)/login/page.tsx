'use client';
import { Button } from '@/components/button';
import { GoogleAuthButton } from '@/components/google-auth-button';
import { useAuth } from '@/contexts/auth-context';
import { Link, useRouter } from '@/i18n/navigation';
import { Eye as EyeIcon } from '@/icons/eye';
import { EyeSlash as EyeSlashIcon } from '@/icons/eye-slash';
import { ApiError } from '@/utils/api-error';
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { AuthLayout } from 'layout/auth/AuthLayout';
import Head from 'next/head';
import { useState } from 'react';
import * as Yup from 'yup';

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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: 'kanahi9009@viicard.com',
      password: 'Password123',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().max(255).required(),
      password: Yup.string().max(255).required(),
    }),
    onSubmit: async (values) => {
      setSubmitError(null);

      mutation.mutate(values, {
        onSuccess: () => {
          push('/');
          refresh();
        },
        onError: (error) => {
          setSubmitError(error.message);
        },
      });
    },
  });

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
            onSubmit={formik.handleSubmit}
          >
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="filled"
            />
            <TextField
              error={!!formik.touched.password && !!formik.errors.password}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="secondary"
                      onClick={handleShowPasswordChange}
                      size="small"
                    >
                      {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
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
            {!!submitError && (
              <FormHelperText error>{submitError}</FormHelperText>
            )}
          </form>
        </div>
      </AuthLayout>
    </>
  );
}
