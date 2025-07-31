import { Order } from '@/types/orders';
import { appFetchAuth } from '@/utils/app-fetch';

export interface SearchOrdersData {
  orders: Order[];
  count: number;
}

export const searchOrders = (query: Record<string, any>) => {
  return appFetchAuth<SearchOrdersData>({
    url: '/orders',
    query,
  });
};
