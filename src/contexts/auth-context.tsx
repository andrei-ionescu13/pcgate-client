'use client';

import { useRouter } from '@/i18n/navigation';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import type { Cart } from '@/types/cart';
import { appFetch } from '@/utils/app-fetch';
import { useGoogleLogin } from '@react-oauth/google';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export interface Decoded {
  userId: string;
  iat: number;
  exp: number;
  email: string;
  avatar: string;
}

interface User extends Omit<Decoded, 'iat' | 'exp'> {
  cart: Cart;
  wishlist: string[];
  avatar: string;
  _id: string;
}

interface SessionContextValue {
  decoded: Decoded | null;
  user: User | null | undefined;
  isAuthenticated: boolean;
  userIsLoading: boolean;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  register: ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  googleAuth: () => void;
  passwordReset: ({
    userId,
    token,
    password,
    confirmPassword,
  }: {
    userId: string;
    token: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

const defaultSessionContext = {
  decoded: null,
  user: undefined,
  isAuthenticated: false,
  userIsLoading: false,
  login: () => Promise.resolve(),
  googleAuth: () => {},
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  passwordReset: () => Promise.resolve(),
  requestPasswordReset: () => Promise.resolve(),
  updateUser: () => {},
};

const SessionContext = createContext<SessionContextValue>(
  defaultSessionContext
);
interface AuthProviderProps {
  children: ReactNode;
  decoded: Decoded | null;
}

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

export const register = ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) =>
  appFetch<void>({
    url: '/auth/register',
    config: {
      method: 'POST',
      body: JSON.stringify({ email, password, confirmPassword }),
    },
  });

export const logout = () =>
  appFetch<void>({
    url: '/auth/logout',
    config: {
      method: 'POST',
    },
  });

export const requestPasswordReset = (email: string) =>
  appFetch<void>({
    url: '/auth/password-reset-token',
    config: {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  });

export const passwordReset = ({
  userId,
  token,
  password,
  confirmPassword,
}: {
  userId: string;
  token: string;
  password: string;
  confirmPassword: string;
}) =>
  appFetch<void>({
    url: '/auth/password-reset',
    config: {
      method: 'PUT',
      body: JSON.stringify({ userId, token, password, confirmPassword }),
    },
  });

export const AuthProvider = ({ decoded, children }: AuthProviderProps) => {
  const { refresh, push } = useRouter();
  const setWishlistProducts = useWishlist((state) => state.setWishlistProducts);
  const setCart = useCart((state) => state.setCart);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null | undefined>();
  const isAuthenticated = !!decoded;
  console.log(decoded);
  const googleAuth = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { code } = codeResponse;
      await appFetch<void>({
        url: '/auth/google',
        config: {
          method: 'POST',
          body: JSON.stringify({ code }),
        },
      });

      push('/');
      refresh();
    },
    onError: (error) => {
      console.log(error);
    },
    flow: 'auth-code',
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const user = await appFetch<User>({
          url: '/auth/me',
          withAuth: true,
        });
        setUser(user);
        setWishlistProducts(user.wishlist);
        setCart(user.cart);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    isAuthenticated && getUser();
  }, [isAuthenticated]);

  const updateUser = (user: Partial<User>) => {
    setUser((prev) => {
      if (prev) {
        return {
          ...prev,
          ...user,
        };
      }
    });
  };

  return (
    <SessionContext.Provider
      value={{
        decoded,
        user,
        userIsLoading: isLoading,
        isAuthenticated,
        login,
        register,
        updateUser,
        logout,
        requestPasswordReset,
        passwordReset,
        googleAuth,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useAuth = () => useContext(SessionContext);
