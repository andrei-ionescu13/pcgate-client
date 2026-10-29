import { appFetch } from '@/utils/app-fetch';
import { useMutation, useQuery } from '@tanstack/react-query';
import { searchProductReviews } from './api';

export const useSearchProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId, 'reviews'],
    queryFn: searchProductReviews(productId),
  });
};

export const useCreateReview = (onSuccess: () => Promise<unknown>) =>
  useMutation<{}, Error, Record<string, string | number>>({
    mutationFn: (values) =>
      appFetch({
        url: '/reviews',
        config: {
          body: JSON.stringify(values),
          method: 'POST',
        },
        withAuth: true,
      }),
    onSuccess,
  });

export const useDeleteReview = (onSuccess?: () => Promise<unknown>) =>
  useMutation<{}, Error, string>({
    mutationFn: (id) =>
      appFetch({
        url: `/reviews/${id}`,
        config: { method: 'DELETE' },
        withAuth: true,
      }),
    onSuccess,
  });
