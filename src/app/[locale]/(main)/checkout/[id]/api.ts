import { Order } from '@/types/orders';
import { appFetchAuth } from '@/utils/app-fetch';

export const getUserOrderByStripeId = (id: string) =>
  appFetchAuth<Order>({
    url: `/orders/checkout/${id}`,
  });
