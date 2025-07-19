import { appFetch } from '@/utils/app-fetch';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { listProductReviews } from './api';

export const useListProductReviews = () => {
  const { slug } = useParams<{ slug: string }>();

  return useQuery({
    queryKey: ['product', slug, 'reviews'],
    queryFn: listProductReviews(slug),
  });
};

export const useCreateReview = (onSuccess: () => Promise<unknown>) =>
  useMutation<{}, Error, Record<string, string | number>>({
    mutationFn: (values) =>
      appFetch({
        url: '/reviews',
        withAuth: true,
        config: {
          body: JSON.stringify(values),
          method: 'POST',
        },
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
