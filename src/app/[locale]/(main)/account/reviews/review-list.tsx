'use client';

import { DataOverlay } from '@/components/data-overlay';
import { PaginationParam } from '@/components/pagination-param';
import type { FC } from 'react';
import { SearchUserReviewsData } from './api';
import { useSearchUserReviews } from './api-hooks';
import { Review } from './review';

interface UserReviewsProps {
  initialData: SearchUserReviewsData;
}

export const ReviewList: FC<UserReviewsProps> = (props) => {
  const { initialData } = props;
  const { data, isRefetching, isPlaceholderData } =
    useSearchUserReviews(initialData);
  const { reviews, count } = data;

  return (
    <div>
      <DataOverlay
        isBlured={isRefetching && isPlaceholderData}
        className="grid gap-4"
      >
        {reviews.map((review) => (
          <Review
            review={review}
            key={review._id}
          />
        ))}
      </DataOverlay>
      {count > 2 && (
        <div className="mt-10 flex content-center">
          <PaginationParam count={Math.ceil(count / 2)} />
        </div>
      )}
    </div>
  );
};
