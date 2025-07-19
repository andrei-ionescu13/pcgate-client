import { useIsMounted } from '@/hooks/use-is-mounted';
import { useScrollTo } from '@/hooks/use-scroll-to';
import type { ProductReview } from '@/types/product';
import { Pagination } from '@mui/material';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ProductRatingReview } from './product-rating-review';

const LIMIT = 12;

interface ProductRatingReviewsProps {
  reviews: ProductReview[];
}

export const ProductRatingReviews: FC<ProductRatingReviewsProps> = (props) => {
  const { reviews } = props;
  const scrollTo = useScrollTo();
  const [page, setPage] = useState(1);
  const isMounted = useIsMounted();
  const pages = reviews ? Math.ceil(reviews.length / LIMIT) : 0;
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const paginatedReviews = reviews
    ?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice((page - 1) * LIMIT, page * LIMIT);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (isMounted && reviewsContainerRef.current) {
      scrollTo(reviewsContainerRef.current);
    }
  }, [page]);

  if (reviews?.length) {
    return (
      <div
        className="px-4 py-6"
        ref={reviewsContainerRef}
      >
        <div className="flex flex-col gap-12">
          {paginatedReviews?.map((review) => (
            <ProductRatingReview
              review={review}
              key={review._id}
            />
          ))}
        </div>
        {pages > 1 && (
          <div className="mt-10 flex justify-end">
            <Pagination
              page={page}
              color="primary"
              onChange={handleChange}
              count={pages}
            />
          </div>
        )}
      </div>
    );
  }

  return null;
};
