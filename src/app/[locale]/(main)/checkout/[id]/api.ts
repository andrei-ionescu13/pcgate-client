import type { Order } from '@/types/orders';
import { appFetch } from '@/utils/app-fetch';

export const getUserOrderByStripeId = (id: string) =>
  appFetch<Order>({
    url: `/orders/checkout/${id}`,
    withAuth: true,
  });
