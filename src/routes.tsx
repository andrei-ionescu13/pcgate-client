import type { PartialRouteObject } from 'react-router';
import { Layout } from './components/layout';
import { GuestGuard } from './components/guest-guard';
import { AuthGuard } from './components/auth-guard';
import { Home } from './pages/home';
import { Bundles } from './pages/bundles';
import { Product } from './pages/product';
import { Products } from './pages/products';
import { Orders } from './pages/orders';
import { Order } from './pages/order';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Wishlist } from './pages/wishlist';
import { PasswordRecovery } from './pages/password-recovery';
import { PasswordReset } from './pages/password-reset';
import { Cart } from './pages/cart';
import { Account } from './pages/account';

export const routes: [PartialRouteObject] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'bundles',
        element: <Bundles />
      },
      {
        path: 'search',
        element: <Products />
      },

      {
        path: 'games/:slug',
        element: <Product />
      },

      {
        path: '/',
        element: <AuthGuard />,
        children: [
          {
            path: '/account',
            element: <Account />,
          },
          {
            path: 'orders',
            children: [
              {
                path: '/',
                element: <Orders />
              },
              {
                path: '/:orderId',
                element: <Order />
              },
            ]
          },
          {
            path: 'wishlist',
            element: <Wishlist />
          },
          {
            path: 'cart',
            element: <Cart />
          }
        ]
      },
      {
        path: '/',
        element: <GuestGuard />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'password-recovery',
            element: <PasswordRecovery />
          },
          {
            path: 'password-reset',
            element: <PasswordReset />
          }
        ]
      }
    ]
  }
];
