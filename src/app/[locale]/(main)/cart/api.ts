import { Cart } from '@/types/cart';
import { appFetchAuth } from '@/utils/app-fetch';

export const getCart = () =>
  appFetchAuth<Cart>({
    url: '/auth/cart',
    withAuth: true,
  });
