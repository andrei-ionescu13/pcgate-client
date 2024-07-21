import type { FC } from 'react';
import { Box, Button, Card, Rating, Typography } from '@mui/material';
import { format } from 'date-fns';
import { Link } from '@/components/link';
import { AppImage } from '@/components/app-image';
import { Steam as SteamIcon } from '@/icons/steam';
import { DialogAlert } from '@/components/dialog-alert';
import { useOpen } from '@/hooks/use-open';
import { appFetch } from '@/utils/app-fetch';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { UserReview as UserReviewI } from '@/types/user';

export const useDeleteReview = (onSuccess: () => void) => useMutation<{}, Error, string>({
  mutationFn: (id) => appFetch({
    url: `/reviews/${id}`,
    config: { method: 'DELETE' },
    withAuth: true
  }),
  onSuccess
})

interface UserReview {
  review: UserReviewI;
  onDelete: () => void;
}

export const UserReview: FC<UserReview> = (props) => {
  const { review, onDelete } = props;
  const queryClient = useQueryClient();
  const [open, handleOpen, handleClose] = useOpen();
  const deleteReview = useDeleteReview((): void => { queryClient.invalidateQueries({ queryKey: ['user-reviews'] }); });
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
              onDelete();
            }
          })
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
            xs: 1
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: {
              sm: 'center',
              xs: 'stretch'
            },
            flexDirection: {
              sm: 'row',
              xs: 'column'
            }
          }}
        >
          <Box
            sx={{
              maxWidth: {
                sm: 220,
                xs: 'none'
              },
              width: '100%',
              borderRadius: 1,
              overflow: 'hidden'
            }}
          >
            <Link href={`/games/${product.slug}`}>
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
          </Box>
          <Box>
            <Link
              href={`/games/${product.slug}`}
              sx={{ color: '#fff' }}
              underline="none"
              variant="body2"
            >
              {product.title}
            </Link>
            <Box sx={{ mt: 1 }}>
              <SteamIcon sx={{ color: '#fff' }} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flex: 1
          }}
        >
          <Typography
            color="textSecondary"
            variant="caption"
          >
            {format(new Date(review.createdAt), 'dd MMMM yyyy')}
          </Typography>
          <Rating
            readOnly
            value={review.rating}
            precision={0.5}
          />
          <Typography
            color="textPrimary"
            variant="body2"
            sx={{ lineBreak: 'anywhere' }}
          >
            {review.content}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 1,
              justifyContent: 'flex-end'
            }}
          >
            <Button
              color="error"
              variant="text"
              onClick={handleOpen}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  )
}