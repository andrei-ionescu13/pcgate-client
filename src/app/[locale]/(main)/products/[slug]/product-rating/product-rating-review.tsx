import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { useRouter } from '@/i18n/navigation';
import type { ProductReview } from '@/types/product';
import { Rating } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useDeleteReview } from '../api-hooks';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

interface ProductRatingReviewProps {
  review: ProductReview;
}
export const ProductRatingReview = ({ review }: ProductRatingReviewProps) => {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteReview = useDeleteReview(() => {
    router.refresh();
    return queryClient.invalidateQueries({
      queryKey: ['product', review.product, 'reviews'],
    });
  });

  return (
    <div className="flex items-start gap-4">
      <div className="grid place-items-center gap-2 md:min-w-60">
        <Avatar>
          <Image
            unoptimized
            fill
            alt="avatar"
            src={review.user.avatar}
          />
        </Avatar>
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
        {isAuthenticated && review.user._id === user._id && (
          <div className="mt-2 flex justify-end">
            <Button
              color="error"
              isLoading={deleteReview.isPending}
              onClick={() => {
                deleteReview.mutate(review._id, {
                  onError: (error) => {
                    toast.error(error.message);
                  },
                });
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
