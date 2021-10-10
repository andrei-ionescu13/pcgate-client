/* eslint-disable @typescript-eslint/no-shadow */
import { createContext, useEffect, useReducer, useContext } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { setWishlistProducts } from '../store/slices/wishlist';
import { setCart } from '../store/slices/cart';
import { useStoreDispatch } from '../hooks/use-store-dispatch';
import type { User } from '../types/user';

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
  const result: { user?: User; status?: number; } = {
    user: undefined,
    status: undefined
  };
  const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/me`, {
    headers: {
      'access-token': `Bearer ${accessToken}`
    }
  });
  result.status = res.status;

  if (res.status === 401) {
    return result;
  }

  const data = await res.json();
  result.user = data;

  return result;
};

const getNewAccesToken = async (refreshToken: string): Promise<string> => {
  const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/access-token`, {
    headers: {
      'refresh-token': refreshToken
    }
  });
  const { accessToken } = await res.json();
  window.localStorage.setItem('accessToken', accessToken);

  return accessToken;
};

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const appDispatch = useStoreDispatch();

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        let accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        if (accessToken) {
          let { user, status } = await getUserData(accessToken);

          if (status === 401 && refreshToken) {
            accessToken = await getNewAccesToken(refreshToken);
            let { user } = await getUserData(accessToken);
            appDispatch(setWishlistProducts(user?.wishlist || []));
            appDispatch(setCart(user?.cart));
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user: {
                  _id: user?._id
                }
              }
            });
          } else {
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
          }
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
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }

    const { accessToken, refreshToken } = await res.json();
    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', refreshToken);

    const res2 = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/me`, {
      headers: {
        'access-token': `Bearer ${accessToken}`
      }
    });
    if (!res2.ok) {
      const data = await res2.json();
      throw new Error(data.message);
    }
    const user = await res2.json();

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
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/register`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ email, password, confirmPassword })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
  };

  const passwordRecovery = async (email: string): Promise<void> => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/password-recovery`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ email })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
  };

  const passwordReset = async (userId: string, token: string, password: string, confirmPassword: string): Promise<void> => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/password-reset`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ password, confirmPassword, userId, token })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
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
