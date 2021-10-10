import type { FC } from 'react';
import { Box, Typography, LinearProgress } from '@material-ui/core';
import type { ReviewsSummary } from '../../types/product';


interface ProductReviewsBreakdownProps {
  reviewsSummary: ReviewsSummary;
}

export const ProductReviewsBreakdown: FC<ProductReviewsBreakdownProps> = (props) => {
  const { reviewsSummary } = props;

  const items = [
    {
      color: 'success.dark',
      percentage: reviewsSummary.ratingsBreakdown.fiveStarPercentage,
      score: 5
    },
    {
      color: 'success.main',
      percentage: reviewsSummary.ratingsBreakdown.fourStarPercentage,
      score: 4
    },
    {
      color: 'warning.light',
      percentage: reviewsSummary.ratingsBreakdown.threeStarPercentage,
      score: 3
    },
    {
      color: 'warning.main',
      percentage: reviewsSummary.ratingsBreakdown.twoStarPercentage,
      score: 2
    },
    {
      color: 'error.main',
      percentage: reviewsSummary.ratingsBreakdown.oneStarPercentage,
      score: 1
    }
  ];

  return (
    <Box>
      {items.map((item) => (
        <Box
          key={item.score}
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
              {item.score}
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

