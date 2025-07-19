'use client';
import { Button } from '@/components/button';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from '@/i18n/navigation';
import { ApiError } from '@/utils/api-error';
import { FormHelperText, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { AuthLayout } from 'layout/auth/AuthLayout';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';

const PasswordReset = () => {
  const { passwordReset } = useAuth();
  const mutation = useMutation<
    void,
    ApiError,
    { userId: string; token: string; password: string; confirmPassword: string }
  >({ mutationFn: passwordReset });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');

  const formik = useFormik({
    initialValues: {
      confirmPassword: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      confirmPassword: Yup.string()
        .max(255)
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
      password: Yup.string().min(8).max(255).required('Password is required'),
    }),
    onSubmit: async (values) => {
      setSubmitError(null);
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
            setSubmitError(error.message);
          },
        }
      );
    },
  });

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
            onSubmit={formik.handleSubmit}
          >
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              variant="filled"
            />
            <TextField
              error={Boolean(
                formik.touched.confirmPassword && formik.errors.confirmPassword
              )}
              fullWidth
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              label="Confirm Password"
              name="confirmPassword"
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
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
            {!!submitError && (
              <FormHelperText error>{submitError}</FormHelperText>
            )}
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default PasswordReset;
