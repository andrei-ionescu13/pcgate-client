"use client"

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
import { Link } from '@/components/link';
import { Google as GoogleIcon } from '@/icons/google';
import { Facebook as FacebookIcon } from '@/icons/facebook';
import { AuthLayout } from 'layout/auth/AuthLayout';
import { useAuth } from '@/contexts/auth-context';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@/utils/api-error';
import { Button } from '@/components/button';
import { toast } from 'react-toastify';
import { NextPageWithLayout } from '../../../temp-pages/pages/_app';
import { useState } from 'react';

export default function Register() {
  const { register } = useAuth();
  const mutation = useMutation<void, ApiError, { email: string, password: string, confirmPassword: string }>({ mutationFn: register })
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      confirmPassword: '',
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      confirmPassword: Yup.string().max(255).oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
      email: Yup.string().max(255).email().required('Email is required'),
      password: Yup.string().min(8).max(255).required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError(null)
      setSubmitting(true);

      mutation.mutate(values, {
        onSuccess: () => {
          toast.success('An activation link has been sent to your email')
        },
        onError: (error) => {
          setSubmitError(error.message)
        },
        onSettled: () => {
          setSubmitting(false);
        }
      })
    }
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div>
        <Box sx={{ mb: 5 }}>
          <Typography
            color="textPrimary"
            variant="h3"
            mb={1}
          >
            Register
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Already have an account?
            {" "}
            <Link
              color="primary"
              variant="subtitle2"
              href="/login"
            >
              Login
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Button
            fullWidth
            color="darkGrey"
            variant="contained"
            size="large"
          >
            <GoogleIcon />
          </Button>
          <Button
            fullWidth
            color="darkGrey"
            variant="contained"
            size="large"
          >
            <FacebookIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography
            color="textSecondary"
            variant="body2"
            my={2.5}
            sx={{
              flex: 1,
              textAlign: 'center',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                display: 'block',
                width: '45%',
                height: '1px',
                background: (theme) => theme.palette.darkGrey.main,
                top: '50%',
                position: 'absolute',
              },
              '&::before': {
                left: 0,
              },
              '&::after': {
                right: 0
              }
            }}
          >
            OR
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
            isLoading={mutation.isPending}
            type="submit"
            size="large"
            variant="contained"
          >
            Register
          </Button>
          {!!submitError && (
            <FormHelperText error>
              {submitError}
            </FormHelperText>
          )}
          <Typography
            color="textSecondary"
            variant="caption"
            textAlign="center"
          >
            I agree to
            {" "}
            <Link
              color="textPrimary"
              href="#"
              variant="inherit"
            >
              Terms of Service
            </Link>
            {" "}
            and
            {" "}
            <Link
              color="textPrimary"
              href="#"
              variant="inherit"
            >
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>
      </div>
    </>
  );
};

