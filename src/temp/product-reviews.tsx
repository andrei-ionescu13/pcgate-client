import { useState } from 'react';
import type { FC } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { ProductReviewCard } from './product-review-card';
import { ProductReviewsAverage } from './product-reviews-average';
import { ProductReviewDialog } from './product-review-dialog';
import { ProductReviewsBreakdown } from './product-reviews-breakdown';
import type { Review, ReviewsSummary } from '@/types/product';
import { useAuth } from 'contexts/auth-context';

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  reviewsSummary: ReviewsSummary;
}

export const ProductReviews: FC<ProductReviewsProps> = (props) => {
  const { user } = useAuth();
  const { reviews: reviewsProp, reviewsSummary: reviewsSummaryProps, productId } = props;
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState(reviewsProp);
  const [reviewsSummary, setReviewsSummary] = useState(reviewsSummaryProps);

  const onAddReview = (newReviews: Review[], newReviewsSummary: ReviewsSummary): void => {
    setReviews(newReviews);
    setReviewsSummary(newReviewsSummary);
  };

  const handleDeleteReview = (reviewId: string): void => {
    setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#000814',
          py: 5
        }}
      >
        <Container maxWidth="lg">
          {(reviews.length && reviewsSummary) ? (
            <>
              <Typography
                color="#fff"
                sx={{ mb: 3 }}
                variant="h5"
              >
                User Ratings &amp; Reviews
              </Typography>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  container
                  item
                  md={4}
                  spacing={5}
                  sx={{ height: 'fit-content' }}
                  xs={12}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <ProductReviewsAverage reviewsSummary={reviewsSummary} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <ProductReviewsBreakdown reviewsSummary={reviewsSummary} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <Typography
                      color="#fff"
                      variant="h6"
                    >
                      Review this product
                    </Typography>
                    <Typography
                      color="#fff"
                      variant="body2"
                    >
                      Share your thoughts with other customers.
                    </Typography>
                    <Button
                      color="primary"
                      fullWidth
                      onClick={() => { setReviewDialogOpen(true); }}
                      size="large"
                      sx={{ mt: 2 }}
                      variant="contained"
                    >
                      Write a review
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  md={8}
                  spacing={2}
                  sx={{ height: 'fit-content' }}
                  xs={12}
                >
                  {reviews.map((review) => (
                    <Grid
                      item
                      key={review._id}
                      xs={12}
                    >
                      <ProductReviewCard
                        onDelete={handleDeleteReview}
                        review={review}
                        showDelete={user?._id === review.userId}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          ) : (
            <Box sx={{ maxWidth: 340 }}>
              <Typography
                color="#fff"
                variant="h6"
              >
                Be the first to review this product
              </Typography>
              <Button
                color="primary"
                fullWidth
                onClick={() => { setReviewDialogOpen(true); }}
                size="large"
                sx={{ mt: 2 }}
                variant="contained"
              >
                Write a review
              </Button>
            </Box>
          )}
        </Container>
      </Box>
      <ProductReviewDialog
        onClose={() => { setReviewDialogOpen(false); }}
        open={reviewDialogOpen}
        productId={productId}
        onSubmit={onAddReview}
      />
    </>
  );
};
