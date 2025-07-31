'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { searchCoupons } from './api';

export const useSearchCoupons = () => {
  const isMounted = useIsMounted();
  const searchParams = useSearchParams();
  const query: any = {};

  for (const [key, value] of searchParams.entries()) {
    if (!!query[key]) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }

  return useQuery({
    queryKey: ['user-coupons', query],
    queryFn: () => searchCoupons(query),
    placeholderData: keepPreviousData,
    enabled: isMounted,
  });
};
