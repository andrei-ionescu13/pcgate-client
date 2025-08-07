'use client';

import { Button } from '@/components/button';
import { GoogleAuthButton } from '@/components/google-auth-button';
import { useAuth } from '@/contexts/auth-context';
import { Link } from '@/i18n/navigation';
import { ApiError } from '@/utils/api-error';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AuthLayout } from 'layout/auth/AuthLayout';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as Yup from 'yup';

interface FormValues {
  confirmPassword: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register } = useAuth();
  const mutation = useMutation<
    void,
    ApiError,
    { email: string; password: string; confirmPassword: string }
  >({ mutationFn: register });

  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        confirmPassword: Yup.string()
          .max(255)
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm password is required'),
        email: Yup.string().max(255).email().required('Email is required'),
        password: Yup.string().min(8).max(255).required('Password is required'),
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
        toast.success('An activation link has been sent to your email');
      },
      onError: (error) => {
        setError('root.serverError', {
          type: 'server',
          message: error.message,
        });
      },
    });
  };

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
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...registerField('email')}
              fullWidth
              label="Email address"
              name="email"
              type="email"
              variant="filled"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...registerField('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="filled"
            />
            <TextField
              {...registerField('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
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
            {!!errors.root?.serverError && (
              <FormHelperText error>
                {errors.root.serverError.message}
              </FormHelperText>
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
