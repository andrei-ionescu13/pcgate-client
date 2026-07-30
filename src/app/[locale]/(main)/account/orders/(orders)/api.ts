import type { Order } from '@/types/orders';
import { appFetch } from '@/utils/app-fetch';

export interface SearchOrdersData {
  orders: Order[];
  count: number;
}

export const searchOrders = (query: Record<string, any>) => {
  return appFetch<SearchOrdersData>({
    url: '/orders',
    query,
    withAuth: true,
  });
};
