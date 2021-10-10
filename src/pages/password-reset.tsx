import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  Container,
  FormHelperText,
  TextField,
  Typography
} from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
import { useAuth } from '../contexts/auth-context';

export const PasswordReset: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { passwordReset } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const formik = useFormik({
    initialValues: {
      confirmPassword: 'Masinarie1',
      password: 'Masinarie1',
      submit: null
    },
    validationSchema: Yup.object().shape({
      confirmPassword:
        Yup
          .string()
          .max(255)
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm password is required'),
      password: Yup.string().max(255).required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      const { password, confirmPassword } = values;
      const userId = searchParams.get('userId');
      const token = searchParams.get('token');

      if (!userId || !token) {
        return;
      }

      try {
        helpers.setSubmitting(true);

        await passwordReset(userId, token, password, confirmPassword);
        navigate('/login');

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>Password Reset</title>
      </Helmet>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.default',
          display: 'flex',
          flex: 1,
          py: 5
        }}
      >
        <Container maxWidth="md">
          <Card
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              minHeight: 400
            }}
          >
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                p: 3
              }}
            >
              <Typography
                color="inherit"
                sx={{ mb: 4 }}
                variant="h5"
              >
                Password Reset
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onChange={formik.handleChange}
                  size="small"
                  type="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                  fullWidth
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  label="Repeat password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  size="small"
                  type="password"
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                sx={{ my: 3 }}
                type="submit"
                variant="contained"
              >
                Reset Password
              </Button>
              {Boolean(formik.errors.submit) && (
                <FormHelperText error>
                  {formik.errors.submit}
                </FormHelperText>
              )}
            </Box>
            <Box
              sx={{
                backgroundImage: 'url(https://fanatical.imgix.net/assets/backgrounds/auth/login-bg-tombraider.jpg?auto=compress,format&dpr=1.100000023841858&fit=clip&h=450&w=366&q=70)',
                backgroundPosition: 'center top',
                backgroundSize: 'cover',
                borderBottomRightRadius: (theme: Theme) => theme.shape.borderRadius,
                borderTopRightRadius: (theme: Theme) => theme.shape.borderRadius,
                display: {
                  md: 'block',
                  xs: 'none'
                },
                position: 'relative',
                width: 300
              }}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};
