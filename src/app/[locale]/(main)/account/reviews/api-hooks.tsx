'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { deleteReview, searchUserReviews, SearchUserReviewsData } from './api';

export const useSearchUserReviews = (initialData: SearchUserReviewsData) => {
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
    queryFn: () => searchUserReviews(query),
    placeholderData: keepPreviousData,
    enabled: isMounted,
    initialData,
  });
};

export const useDeleteReview = (onSuccess: any) =>
  useMutation<{}, Error, string>({
    mutationFn: deleteReview,
    onSuccess,
  });
