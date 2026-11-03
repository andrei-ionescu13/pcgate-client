import type { Coupon } from '@/types/common';
import { appFetch } from '@/utils/app-fetch';

export interface SearchCouponsData {
  coupons: Coupon[];
  count: number;
}

export const searchCoupons = (query: Record<string, any>) =>
  appFetch<SearchCouponsData>({
    url: '/coupons/search',
    query,
    withAuth: true,
  });
