'use client';

import { Product } from '@/types/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { listDealProducts } from './api';

export const useDealProducts = (initialProducts: {
  products: Product[];
  hasNext: boolean;
}) => {
  const { slug } = useParams<{ slug: string }>();

  return useInfiniteQuery({
    queryKey: ['deal-products', slug],
    queryFn: ({ pageParam }) => listDealProducts(slug, pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : undefined,
    initialPageParam: 0,
    initialData: { pageParams: [0], pages: [initialProducts] },
  });
};
