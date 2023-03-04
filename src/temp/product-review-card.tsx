import type { FC } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Box, Button, Card, Rating, Typography } from '@mui/material';
import type { Review } from '@/types/product';
import { useRemoveProductReview } from 'api/products';

interface ProductReviewCardProps {
  review: Review;
  showDelete?: boolean;
  onDelete: (reviewId: string) => void;
}

export const ProductReviewCard: FC<ProductReviewCardProps> = (props) => {
  const { review, showDelete = false, onDelete } = props;
  const { mutate, isLoading } = useRemoveProductReview();

  const handleDelete = async () => {
    mutate((review._id), {
      onSuccess: () => {
        onDelete(review._id);
      }
    });
  };

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Typography
          color="textPrimary"
          variant="h6"
        >
          {review.title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Rating
          readOnly
          value={review.rating}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          mb: 1
        }}
      >
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {review.displayName}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ ml: 3 }}
          variant="body1"
        >
          Posted:
          {' '}
          {formatDistanceToNow(new Date(review.date))}
        </Typography>
      </Box>
      <Typography
        color="textPrimary"
        variant="body2"
      >
        {review.text}
      </Typography>
      {showDelete && (<Button
        color="error"
        disabled={isLoading}
        onClick={handleDelete}
        sx={{
          display: 'block',
          ml: 'auto',
          mt: 5
        }}
        variant="text"
      >
        Delete
      </Button>)}
    </Card>
  );
};
