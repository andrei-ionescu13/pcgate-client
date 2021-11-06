import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, Container, FormHelperText, TextField, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useAuth } from '../contexts/auth-context';

export const PasswordRecovery: FC = () => {
  const { passwordRecovery } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().max(255).email().required('Email is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);

        await passwordRecovery(values.email);

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
        <title>Password Recovery</title>
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
                sx={{ mb: 1 }}
                variant="h5"
              >
                Password Recovery
              </Typography>
              <Typography
                color="inherit"
                sx={{ mb: 4 }}
                variant="body2"
              >
                We'll send a password setup link to your account's email address.
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
                  sx={{ backgroundColor: 'transparent' }}
                />
              </Box>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                sx={{ my: 3 }}
                type="submit"
                variant="contained"
              >
                Recover Password
              </Button>
              {Boolean(formik.errors.submit) && (
                <FormHelperText error>
                  {formik.errors.submit}
                </FormHelperText>
              )}
              {Boolean(formik.status?.success) && (
                <FormHelperText sx={{ color: 'success.main' }} >
                  A confirmation email has been send
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
