import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from 'layout/auth/AuthLayout';
import { useAuth } from '@/contexts/auth-context';
import { ApiError } from '@/utils/api-error';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/button';
import { NextPageWithLayout } from './_app';

const PasswordRecovery: NextPageWithLayout = () => {
  const { requestPasswordReset } = useAuth();
  const mutation = useMutation<void, ApiError, string>(requestPasswordReset);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().max(255).email().required('Email is required')
    }),
    onSubmit: async (values, helpers) => {
      setSubmitError(null)

      mutation.mutate(values.email, {
        onSuccess: () => {
          toast.success('A reset link has been sent to your email')
        },
        onError: (error) => {
          setSubmitError(error.message)
        }
      })
    }
  });

  return (
    <>
      <Head>
        <title>Password Recovery</title>
      </Head>
      <div>
        <Box sx={{ mb: 5 }}>
          <Typography
            color="textPrimary"
            variant="h3"
            mb={1}
          >
            Password Recovery
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            We&apos;ll send a password setup link to your account&apos;s email address.
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5
          }}
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
            isLoading={mutation.isLoading}
            type="submit"
            size="large"
            variant="contained"
          >
            Reset
          </Button>
        </Box>
      </div>
    </>
  );
};

export default PasswordRecovery;


PasswordRecovery.getLayout = (page: React.ReactElement) => {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}