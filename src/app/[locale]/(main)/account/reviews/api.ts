import { UserReview } from '@/types/user';
import { appFetchAuth } from '@/utils/app-fetch';

export interface SearchUserReviewsData {
  reviews: UserReview[];
  count: number;
}

export const searchUserReviews = (query: Record<string, any>) =>
  appFetchAuth<SearchUserReviewsData>({
    url: '/auth/reviews',
    withAuth: true,
    query,
  });

export const deleteReview = (id: string) =>
  appFetchAuth<{}>({
    url: `/reviews/${id}`,
    config: { method: 'DELETE' },
    withAuth: true,
  });
