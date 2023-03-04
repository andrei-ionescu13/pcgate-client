import type { FC } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import type { ReviewsSummary } from '@/types/product';


interface ProductReviewsBreakdownProps {
  reviewsSummary: ReviewsSummary;
}

export const ProductReviewsBreakdown: FC<ProductReviewsBreakdownProps> = (props) => {
  const { reviewsSummary } = props;

  const items = [
    {
      color: 'success.dark',
      percentage: reviewsSummary.ratingsBreakdown.fiveStarPercentage,
      rating: 5
    },
    {
      color: 'success.main',
      percentage: reviewsSummary.ratingsBreakdown.fourStarPercentage,
      rating: 4
    },
    {
      color: 'warning.light',
      percentage: reviewsSummary.ratingsBreakdown.threeStarPercentage,
      rating: 3
    },
    {
      color: 'warning.main',
      percentage: reviewsSummary.ratingsBreakdown.twoStarPercentage,
      rating: 2
    },
    {
      color: 'error.main',
      percentage: reviewsSummary.ratingsBreakdown.oneStarPercentage,
      rating: 1
    }
  ];

  return (
    <Box>
      {items.map((item) => (
        <Box
          key={item.rating}
          sx={{
            '& + &': {
              mt: 1.5
            }
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography
              color="#fff"
              sx={{ mb: 0.5 }}
              variant="body1"
            >
              {item.rating}
              {' '}
              Stars
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              color="#fff"
              variant="body1"
            >
              {item.percentage}
              %
            </Typography>
          </Box>
          <LinearProgress
            sx={{
              backgroundColor: 'background.default',
              height: 16,
              borderRadius: 2,
              '& .MuiLinearProgress-barColorPrimary': {
                backgroundColor: item.color
              }
            }}
            value={item.percentage}
            variant="determinate"
          />
        </Box>
      ))}
    </Box>
  );
};

