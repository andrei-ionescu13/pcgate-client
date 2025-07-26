import { Order } from '@/types/orders';
import { appFetchAuth } from '@/utils/app-fetch';

export interface SearchOrdersData {
  orders: Order[];
  count: number;
}

export const searchOrders = (query: Record<string, any>) => {
  console.log(query);
  return appFetchAuth<SearchOrdersData>({
    url: '/orders',
    withAuth: true,
    query,
  });
};
