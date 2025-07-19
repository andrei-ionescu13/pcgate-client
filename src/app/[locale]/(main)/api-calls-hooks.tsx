import { useIsMounted } from '@/hooks/use-is-mounted';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchProducts } from './api-calls';

export const useSearchProducts = (query) => {
  const isMounted = useIsMounted();

  return useQuery({
    queryKey: ['products', query],
    queryFn: () => searchProducts(query),
    placeholderData: keepPreviousData,
    enabled: isMounted,
  });
};
