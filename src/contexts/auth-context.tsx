/* eslint-disable @typescript-eslint/no-shadow */
//@ts-nocheck

import { createContext, useEffect, useReducer, useContext } from 'react';
import type { FC, ReactNode } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { setWishlistProducts } from '../store/slices/wishlist';
import { setCart } from '../store/slices/cart';
import { useAppDispatch } from '../hooks/use-store-dispatch';
import type { User } from '../types/user';
import { appFetch } from 'utils/app-fetch';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user?: User;
}

interface AuthContextValue extends State {
  login: (email: string, password: string) => Promise<void>;
  passwordRecovery: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, confirmPassword: string) => Promise<void>;
  passwordReset: (userId: string, token: string, password: string, confirmPassword: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: 'INITIALIZE';
  payload: {
    isAuthenticated: boolean;
    user: User | undefined;
  };
};

type LoginAction = {
  type: 'LOGIN';
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: 'LOGOUT';
};

type RegisterAction = {
  type: 'REGISTER';
};

type Action =
  InitializeAction
  | LoginAction
  | LogoutAction
  | RegisterAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: undefined
};

const handlers: Record<string, (state: State, action: any) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: undefined
  }),
};

const reducer = (state: State, action: Action): State => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  passwordRecovery: () => Promise.resolve(),
  passwordReset: () => Promise.resolve(),
});

const getUserData = async (accessToken: string): Promise<{ user?: User; status?: number; }> => {
  const data = await appFetch('auth/me', {
    headers: {
      'access-token': `Bearer ${accessToken}`
    }
  });

  return data;
};

const getNewAccesToken = async (refreshToken: string): Promise<string> => {
  const { accessToken } = await appFetch('auth/access-token', {
    headers: {
      'refresh-token': refreshToken
    }
  });
  window.localStorage.setItem('accessToken', accessToken);

  return accessToken;
};

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        let accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        if ((!Boolean(accessToken) || jwtDecode(accessToken).exp * 1000 < Date.now()) &&
          Boolean(refreshToken) && jwtDecode(refreshToken).exp * 1000 > Date.now()) {
          console.log('dasdas');
          accessToken = await getNewAccesToken(refreshToken);
        }

        if (accessToken) {
          const { user } = await getUserData(accessToken);
          appDispatch(setWishlistProducts(user?.wishlist || []));
          appDispatch(setCart(user?.cart));
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: {
                _id: user?._id,
                email: user?.email
              }
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: undefined
            }
          });
        }
      } catch (error) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: undefined
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const { accessToken, refreshToken } = await appFetch('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', refreshToken);

    const user = await appFetch('auth/me', {
      headers: {
        'access-token': `Bearer ${accessToken}`
      }
    });

    dispatch({
      type: 'LOGIN',
      payload: {
        user: user
      }
    });
  };

  const logout = async (): Promise<void> => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    dispatch({
      type: 'LOGOUT'
    });
  };

  const register = async (email: string, password: string, confirmPassword: string): Promise<void> => {
    await appFetch('auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, confirmPassword })
    });
  };

  const passwordRecovery = async (email: string): Promise<void> => {
    await appFetch('auth/password-recovery', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  };

  const passwordReset = async (userId: string, token: string, password: string, confirmPassword: string): Promise<void> => {
    await appFetch('auth/password-reset', {
      method: 'POST',
      body: JSON.stringify({ password, confirmPassword, userId, token })
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        passwordRecovery,
        passwordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
