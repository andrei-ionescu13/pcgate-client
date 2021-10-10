import type { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useAuth } from '../contexts/auth-context';

export const Login: FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().max(255).email().required('Email is required'),
      password: Yup.string().max(255).required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const { email, password } = values;
        await login(email, password);
        navigate('/');
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
        <title>Login</title>
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
              minHeight: 600
            }}
          >
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                color: 'text.primary',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                p: 3
              }}
            >
              <Typography
                color="inherit"
                sx={{ mb: 4 }}
                variant="h5"
              >
                Log in
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  size="small"
                  type="email"
                  value={formik.values.email}
                />
              </Box>
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
              <Link
                color="textPrimary"
                component={RouterLink}
                sx={{ alignSelf: 'flex-end' }}
                to="/password-recovery"
                variant="body2"
              >
                Forgot password?
              </Link>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                sx={{ my: 3 }}
                type="submit"
                variant="contained"
              >
                Log in
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
            >
              <Box
                sx={{
                  backgroundColor: '#263238',
                  borderBottomRightRadius: (theme: Theme) => theme.shape.borderRadius,
                  borderTopRightRadius: (theme: Theme) => theme.shape.borderRadius,
                  height: '100%',
                  opacity: 0.7,
                  position: 'absolute',
                  width: '100%',
                  zIndex: 10
                }}
              />
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                  p: 2,
                  position: 'absolute',
                  width: '100%',
                  zIndex: 100
                }}
              >
                <Typography
                  align="center"
                  color="#fff"
                  variant="h5"
                >
                  Are you new?
                </Typography>
                <Button
                  component={RouterLink}
                  sx={{
                    borderColor: '#fff',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000'
                    },
                    mt: 3
                  }}
                  to="/register"
                  variant="outlined"
                >
                  Create Account
                </Button>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};
