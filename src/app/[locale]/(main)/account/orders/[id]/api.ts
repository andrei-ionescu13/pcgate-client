import { Order } from '@/types/orders';
import { appFetchAuth } from '@/utils/app-fetch';

export const getUserOrder = (id: string) =>
  appFetchAuth<Order>({
    url: `/orders/${id}`,
    withAuth: true,
  });
