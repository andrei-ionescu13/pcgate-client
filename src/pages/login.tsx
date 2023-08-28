import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  FormHelperText,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link } from "@/components/link";
import { Google as GoogleIcon } from "@/icons/google";
import { Facebook as FacebookIcon } from "@/icons/facebook";
import { Eye as EyeIcon } from "@/icons/eye";
import { EyeSlash as EyeSlashIcon } from "@/icons/eye-slash";
import { AuthLayout } from "layout/auth/AuthLayout";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/button";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "@/utils/api-error";
import { Layout } from "layout/layout";
import { NextPageWithLayout } from "./_app";

const Login: NextPageWithLayout = () => {
  const { login } = useAuth();
  const mutation = useMutation<
    void,
    ApiError,
    { email: string; password: string }
  >(login);
  const { push } = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "andrei.ionescu3535@gmail.com",
      password: "Password1234",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().max(255).required(),
      password: Yup.string().max(255).required(),
    }),
    onSubmit: async (values) => {
      setSubmitError(null);

      mutation.mutate(values, {
        onSuccess: () => {
          push("/");
        },
        onError: (error) => {
          setSubmitError(error.message);
        },
      });
    },
  });

  const handleShowPasswordChange = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <Box sx={{ mb: 5 }}>
          <Typography color="textPrimary" variant="h3" mb={1}>
            Login
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Don’t have an account?{" "}
            <Link color="primary" variant="subtitle2" href="/register">
              Get Started
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button fullWidth color="darkGrey" variant="contained" size="large">
            <GoogleIcon />
          </Button>
          <Button fullWidth color="darkGrey" variant="contained" size="large">
            <FacebookIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="body2"
            my={2.5}
            sx={{
              flex: 1,
              textAlign: "center",
              position: "relative",
              "&::before, &::after": {
                content: '""',
                display: "block",
                width: "45%",
                height: "1px",
                background: (theme) => theme.palette.darkGrey.main,
                top: "50%",
                position: "absolute",
              },
              "&::before": {
                left: 0,
              },
              "&::after": {
                right: 0,
              },
            }}
          >
            OR
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
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
            error={!!formik.touched.password && !!formik.errors.password}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="secondary"
                    onClick={handleShowPasswordChange}
                    size="small"
                  >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              href="/password-recovery"
              color="textSecondary"
              variant="body3"
              underline="always"
            >
              Forgot password?
            </Link>
          </Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            isLoading={mutation.isLoading}
          >
            Login
          </Button>
          {!!submitError && (
            <FormHelperText error>{submitError}</FormHelperText>
          )}
        </Box>
      </div>
    </>
  );
};

export default Login;

Login.getLayout = (page: React.ReactElement) => {
  return <AuthLayout text="Hi, Welcome Back">{page}</AuthLayout>;
};
