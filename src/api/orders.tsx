import { useQuery } from 'react-query';
import { appAuthfetch } from '../utils/app-auth-fetch';
import type { Order } from '../types/orders';

export const useGetOrders = () => useQuery<Order[]>('orders', () => appAuthfetch('orders'), { cacheTime: 0 });
export const useGetOrder = (id: string) => useQuery<Order>(['orders', id], () => appAuthfetch(`orders/${id}`));