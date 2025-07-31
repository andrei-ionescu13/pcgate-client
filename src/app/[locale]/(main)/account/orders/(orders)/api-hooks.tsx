'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';
import { useSearchParamsQuery } from '@/hooks/useSearchParamsQuery';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchOrders } from './api';

export const useSearchOrders = () => {
  const isMounted = useIsMounted();
  const query = useSearchParamsQuery();

  return useQuery({
    queryKey: ['orders', query],
    queryFn: () => searchOrders(query),
    placeholderData: keepPreviousData,
    enabled: isMounted,
  });
};
