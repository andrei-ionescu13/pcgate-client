import { AuthLayout } from "layout/auth/AuthLayout";

export default function LoginLayout({ children }) {
  return <AuthLayout text="Hi, Welcome Back">{children}</AuthLayout>
} 