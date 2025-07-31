'use client';
import { Button } from '@/components/button';
import { useAuth } from '@/contexts/auth-context';
import { ApiError } from '@/utils/api-error';
import { FormHelperText, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { AuthLayout } from 'layout/auth/AuthLayout';
import Head from 'next/head';
import { useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

const PasswordRecovery = () => {
  const { requestPasswordReset } = useAuth();
  const mutation = useMutation<void, ApiError, string>({
    mutationFn: requestPasswordReset,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().max(255).email().required('Email is required'),
    }),
    onSubmit: async (values, helpers) => {
      setSubmitError(null);

      mutation.mutate(values.email, {
        onSuccess: () => {
          toast.success('A reset link has been sent to your email');
        },
        onError: (error) => {
          setSubmitError(error.message);
        },
      });
    },
  });

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
            <Button
              color="primary"
              isLoading={mutation.isPending}
              type="submit"
              size="large"
              variant="contained"
            >
              Reset
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

export default PasswordRecovery;
