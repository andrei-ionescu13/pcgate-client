import type { Cart } from '@/types/cart';
import { appFetch } from '@/utils/app-fetch';

export const getCart = () =>
  appFetch<Cart>({
    url: '/cart',
    withAuth: true,
  });
