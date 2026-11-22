'use client';

import type { Product } from '@/types/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { listDealProducts } from './api';

export const useDealProducts = (initialProducts: {
  products: Product[];
  hasNext: boolean;
  nextCursor: string | null;
}) => {
  const { slug } = useParams<{ slug: string }>();

  return useInfiniteQuery({
    queryKey: ['deal-products', slug],
    queryFn: ({ pageParam }) => listDealProducts(slug, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialData: {
      pageParams: [null],
      pages: [initialProducts],
    },
  });
};
