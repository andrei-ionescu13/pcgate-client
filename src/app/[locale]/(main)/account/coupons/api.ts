import { Coupon } from '@/types/common';
import { appFetch } from '@/utils/app-fetch';

export interface SearchCouponsData {
  promoCodes: Coupon[];
  count: number;
}

export const searchCoupons = (query: Record<string, any>) =>
  appFetch<SearchCouponsData>({
    url: '/auth/promo-codes',
    withAuth: true,
    query,
  });
