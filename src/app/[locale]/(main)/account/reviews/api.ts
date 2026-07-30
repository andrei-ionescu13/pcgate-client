import type { UserReview } from '@/types/user';
import { appFetch } from '@/utils/app-fetch';

export interface SearchUserReviewsData {
  reviews: UserReview[];
  count: number;
}

export const searchUserReviews = (query: Record<string, any>) =>
  appFetch<SearchUserReviewsData>({
    url: '/auth/reviews',
    query,
    withAuth: true,
  });

export const deleteReview = (id: string) =>
  appFetch<{}>({
    url: `/reviews/${id}`,
    config: { method: 'DELETE' },
    withAuth: true,
  });
