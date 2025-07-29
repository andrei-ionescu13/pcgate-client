import { Coupon } from '@/types/common';
import { appFetchAuth } from '@/utils/app-fetch';

export interface SearchCouponsData {
  promoCodes: Coupon[];
  count: number;
}

export const searchCoupons = (query: Record<string, any>) =>
  appFetchAuth<SearchCouponsData>({
    url: '/auth/promo-codes',
    query,
  });
