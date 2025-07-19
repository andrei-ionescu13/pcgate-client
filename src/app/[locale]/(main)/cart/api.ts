import { Cart } from '@/types/cart';
import { appFetch } from '@/utils/app-fetch';

export const getCart = () =>
  appFetch<Cart>({
    url: '/auth/cart',
    withAuth: true,
  });
