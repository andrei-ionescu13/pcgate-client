'use client';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { Cart } from '@/types/cart';
import { useQuery } from '@tanstack/react-query';
import { getCart } from './api';

export const useCart = (initialData: Cart) => {
  const isMounted = useIsMounted();

  return useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    initialData,
    enabled: isMounted,
  });
};
