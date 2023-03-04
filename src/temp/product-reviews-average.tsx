import type { FC } from 'react';
import { Box, Card, Rating, Typography } from '@mui/material';
import type { ReviewsSummary } from '@/types/product';

interface ProductReviewsAverageProps {
  reviewsSummary: ReviewsSummary;
}

export const ProductReviewsAverage: FC<ProductReviewsAverageProps> = (props) => {
  const { reviewsSummary } = props;

  return (
    <Card
      elevation={0}
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.default',
        display: 'flex',
        p: 1.5
      }}
    >
      <Box>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          User Rating
        </Typography>
        <Rating
          readOnly
          size="large"
          value={reviewsSummary.averageRating}
        />
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Average rating from
          {' '}
          <Typography
            color="textPrimary"
            component="span"
            variant="inherit"
          >
            <strong>
              {reviewsSummary.reviewsCount}
              {' '}
              rating
              {reviewsSummary.reviewsCount > 1 && 's'}
            </strong>
          </Typography>
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          <Typography
            color="textPrimary"
            component="span"
            variant="inherit"
          >
            <strong>
              {reviewsSummary.recommendedPercentage}
              %
            </strong>
          </Typography>
          {' '}
          of users would recommend this
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'success.light',
          display: 'flex',
          justifyContent: 'center',
          minWidth: 50,
          p: 1
        }}
      >
        <Typography
          color="textPrimary"
          component="p"
          variant="h4"
        >
          {reviewsSummary.averageRating}
        </Typography>
      </Box>
    </Card>
  );
};
