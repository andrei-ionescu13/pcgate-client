'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { searchLibrary } from './api';

export const useSearchLibary = () => {
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
    queryKey: ['user-reviews', query],
    queryFn: () => searchLibrary(query),
    placeholderData: keepPreviousData,
    enabled: isMounted,
  });
};
