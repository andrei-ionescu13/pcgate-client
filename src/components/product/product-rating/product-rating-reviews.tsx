import { useEffect, useRef, useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Box, Pagination } from '@mui/material';
import { ProductRatingReview } from './product-rating-review';
import type { ProductReview } from '@/types/product';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useScrollTo } from '@/hooks/use-scroll-to';

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
  const paginatedReviews = reviews?.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).slice((page - 1) * LIMIT, page * LIMIT);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (isMounted && reviewsContainerRef.current) {
      scrollTo(reviewsContainerRef.current)
    }
  }, [page])


  if (reviews?.length) {
    return (
      <Box
        ref={reviewsContainerRef}
        sx={{
          py: 3,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {paginatedReviews?.map((review) => (
            <ProductRatingReview
              review={review}
              key={review._id}
            />
          ))}
        </Box>
        {pages > 1 && (
          <Box
            sx={{
              mt: 5,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Pagination
              page={page}
              color="primary"
              onChange={handleChange}
              count={pages}
            />
          </Box>
        )}
      </Box>
    )
  }

  return null;
}
