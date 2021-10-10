import type { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

interface AuthGuardProps {
  children?: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children || <Outlet />}</>;
};
