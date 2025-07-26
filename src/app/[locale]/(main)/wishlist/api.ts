import { Product } from '@/types/product';
import { appFetchAuth } from '@/utils/app-fetch';

export const getWishlist = () =>
  appFetchAuth<Product[]>({
    url: '/auth/wishlist',
    withAuth: true,
  });
