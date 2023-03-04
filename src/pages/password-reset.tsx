import { useRouter } from 'next/router';
import Head from 'next/head';
import type { NextPage } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from 'layout/auth/AuthLayout';
import { Button } from '@/components/button';
import { useAuth } from '@/contexts/auth-context';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@/utils/api-error';
import { useState } from 'react';
import { NextPageWithLayout } from './_app';

const PasswordReset: NextPageWithLayout = () => {
  const { passwordReset } = useAuth();
  const mutation = useMutation<void, ApiError, { userId: string, token: string, password: string, confirmPassword: string }>(passwordReset);
  const router = useRouter();
  const { query } = router;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      confirmPassword: 'Masinarie1',
      password: 'Masinarie1',
    },
    validationSchema: Yup.object().shape({
      confirmPassword:
        Yup
          .string()
          .max(255)
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm password is required'),
      password: Yup.string().min(8).max(255).required('Password is required')
    }),
    onSubmit: async (values,) => {
      setSubmitError(null)
      if (!query?.token || typeof query.token !== 'string' || !query?.userId || typeof query.userId !== 'string') return;
      mutation.mutate({ ...values, token: query.token, userId: query.userId }, {
        onSuccess: () => {
          router.push('/login')
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
        <title>Password Reset</title>
      </Head>
      <div>
        <Box sx={{ mb: 5 }}>
          <Typography
            color="textPrimary"
            variant="h3"
            mb={1}
          >
            Password Reset
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Choose a new password
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
            error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
            fullWidth
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
            isLoading={mutation.isLoading}
            size="large"
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          {!!submitError && (
            <FormHelperText error>
              {submitError}
            </FormHelperText>
          )}
        </Box>
      </div>
    </>
  );
};

export default PasswordReset;

PasswordReset.getLayout = (page: React.ReactElement) => {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}