import type { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, FormHelperText, InputBase, Typography } from '@material-ui/core';

export const Newsletter: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null
    },
    onSubmit: values => {
    },
  });

  return (
    <Box sx={{
      backgroundColor: '#201A23',
      py: 5
    }}
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          sx={{ color: '#fff' }}
          variant="subtitle1"
        >
          Sign up for our newsletter to keep up with the latest deals from PCGATE!
        </Typography>
        <form onSubmit={formik.handleBlur}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              mt: 2.5,
              flexDirection: {
                md: 'row',
                xs: 'column'
              }
            }}
          >
            <InputBase
              inputProps={{
                name: 'email',
                sx: {
                  minWidth: 240,
                  py: 1.2,
                  px: 2
                }
              }}
              placeholder="Your email"
              type="email"
              value={formik.values.email}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                color: '#000',
                height: 47,
                mb: {
                  md: 0,
                  xs: 2
                },
                mr: {
                  md: 2
                }
              }}
            />
            <Button
              color="secondary"
              size="large"
              type="submit"
              variant="contained"
            >
              Sign up
            </Button>
          </Box>
          {formik.errors.submit && (
            <FormHelperText
              error
              sx={{
                textAlign: 'center',
                mt: 2
              }}
            >
              {formik.errors.submit}
            </FormHelperText>
          )}
        </form>
      </Container>
    </Box>
  );
};
