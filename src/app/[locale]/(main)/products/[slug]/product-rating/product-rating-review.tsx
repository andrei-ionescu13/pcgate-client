import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import type { ProductReview } from '@/types/product';
import { Rating } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import type { FC } from 'react';
import { useDeleteReview } from '../api-hooks';

interface ProductRatingReviewProps {
  review: ProductReview;
}
export const ProductRatingReview: FC<ProductRatingReviewProps> = (props) => {
  const { review } = props;
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const deleteReview = useDeleteReview(() =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ['product', slug] }),
      queryClient.invalidateQueries({ queryKey: ['product', slug, 'reviews'] }),
    ])
  );

  return (
    <div className="flex items-start gap-4">
      <div className="grid place-items-center gap-2 md:min-w-60">
        <Avatar />
        <p className="subtitle2">{review.userName}</p>
        <p className="caption text-text-secondary">
          {format(new Date(review.createdAt), 'dd MMMM yyyy')}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Rating
          readOnly
          value={review.rating}
          precision={0.5}
        />
        <p className="body2">{review.content}</p>
        {review.hasDelete && (
          <div className="mt-2 flex justify-end">
            <Button
              color="error"
              variant="text"
              isLoading={deleteReview.isPending}
              onClick={() => {
                deleteReview.mutate(review._id);
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
