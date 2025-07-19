'use client';
import { AppImage } from '@/components/app-image';
import { DialogAlert } from '@/components/dialog-alert';
import { useOpen } from '@/hooks/use-open';
import { Link } from '@/i18n/navigation';
import { Steam as SteamIcon } from '@/icons/steam';
import type { UserReview as UserReviewI } from '@/types/user';
import { Button, Card, Rating } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import type { FC } from 'react';
import { useDeleteReview } from './api-hooks';

interface UserReview {
  review: UserReviewI;
}

export const Review: FC<UserReview> = (props) => {
  const { review } = props;
  const queryClient = useQueryClient();
  const [open, handleOpen, handleClose] = useOpen();
  const deleteReview = useDeleteReview(() => {
    queryClient.invalidateQueries({ queryKey: ['user-reviews'] });
  });

  const { product } = review;

  return (
    <>
      <DialogAlert
        open={open}
        onClose={handleClose}
        onSubmit={() => {
          deleteReview.mutate(review._id, {
            onSuccess: () => {
              handleClose();
            },
          });
        }}
        isLoading={deleteReview.isPending}
        title="Delete review"
        content="Are you sure you want to delete this review?"
      />
      <Card
        elevation={0}
        sx={{
          backgroundColor: 'background.neutral',
          display: 'grid',
          gap: 2,
          p: {
            sm: 2,
            xs: 1,
          },
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-full overflow-hidden rounded-lg sm:max-w-56">
            <Link href={`/products/${product.slug}`}>
              <AppImage
                layout="responsive"
                width={16}
                height={9}
                priority
                src={product.cover.public_id}
                alt={product.title}
                sizes="
                (min-width: 1200px) 400px,
                (min-width: 900px) 33vw,
                (min-width: 600px) 50vw"
              />
            </Link>
          </div>
          <div>
            <Link
              href={`/products/${product.slug}`}
              sx={{ color: '#fff' }}
              underline="none"
              variant="body2"
            >
              {product.title}
            </Link>
            <div className="mt-2">
              <SteamIcon sx={{ color: '#fff' }} />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-text-secondary caption">
            {format(new Date(review.createdAt), 'dd MMMM yyyy')}
          </p>
          <Rating
            readOnly
            value={review.rating}
            precision={0.5}
          />
          <p className="body2">{review.content}</p>
          <div className="mt-2 flex content-end">
            <Button
              color="error"
              variant="text"
              onClick={handleOpen}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
