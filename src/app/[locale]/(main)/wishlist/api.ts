import { Product } from '@/types/product';
import { appFetch } from '@/utils/app-fetch';

export const getWishlist = () =>
  appFetch<Product[]>({
    url: '/auth/wishlist',
    withAuth: true,
  });
