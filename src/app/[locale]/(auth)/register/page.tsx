'use client';

import { Button } from '@/components/button';
import { GoogleAuthButton } from '@/components/google-auth-button';
import { useAuth } from '@/contexts/auth-context';
import { Link } from '@/i18n/navigation';
import { ApiError } from '@/utils/api-error';
import { FormHelperText, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { AuthLayout } from 'layout/auth/AuthLayout';
import Head from 'next/head';
import { useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

const Register = () => {
  const { register } = useAuth();
  const mutation = useMutation<
    void,
    ApiError,
    { email: string; password: string; confirmPassword: string }
  >({ mutationFn: register });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      confirmPassword: '',
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      confirmPassword: Yup.string()
        .max(255)
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
      email: Yup.string().max(255).email().required('Email is required'),
      password: Yup.string().min(8).max(255).required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError(null);
      setSubmitting(true);

      mutation.mutate(values, {
        onSuccess: () => {
          toast.success('An activation link has been sent to your email');
        },
        onError: (error) => {
          setSubmitError(error.message);
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <AuthLayout text="Experience our website fully">
        <div>
          <div className="mb-10">
            <h3 className="mb-1">Register</h3>
            <p className="body2 text-text-secondary">
              Already have an account?{' '}
              <Link
                href="/login"
                className="hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
          <div className="flex gap-4">
            <GoogleAuthButton />
            {/* <Button
            fullWidth
            color="darkGrey"
            variant="contained"
            size="large"
          >
            <FacebookIcon />
          </Button> */}
          </div>
          <div className="flex content-center">
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
              type="submit"
              size="large"
              variant="contained"
            >
              Register
            </Button>
            {!!submitError && (
              <FormHelperText error>{submitError}</FormHelperText>
            )}
            <p className="caption text-text-secondary text-center align-middle">
              I agree to{' '}
              <Link
                href="#"
                className="hover:underline"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="#"
                className="hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Register;
