'use client';

import { useScrollTo } from '@/hooks/use-scroll-to';
import { Pencil as PencilIcon } from '@/icons/pencil';
import type { Product } from '@/types/product';
import {
  Button,
  Card,
  CircularProgress,
  Divider,
  LinearProgress,
} from '@mui/material';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useListProductReviews } from '../api-hooks';
import { ProductRatingReviewForm } from './product-rating-review-form';
import { ProductRatingReviews } from './product-rating-reviews';

interface ProductRatingProps {
  product: Product;
}

export const ProductRating: FC<ProductRatingProps> = (props) => {
  const { product } = props;
  const scrollTo = useScrollTo();
  const [formOpen, setFormOpen] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const { data: reviews, isLoading } = useListProductReviews();

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  useEffect(() => {
    if (formOpen && formContainerRef.current) {
      scrollTo(formContainerRef.current);
    }
  }, [formOpen]);

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  return (
    <Card variant="outlined">
      <div className="divide-divider grid divide-x md:grid-cols-3">
        <div className="grid items-center justify-center justify-items-center p-6">
          <p className="subtitle1">Average rating</p>
          <h2>
            {product.rating.average}
            /5
          </h2>
        </div>
        <div className="grid items-center p-6">
          {Object.keys(product.rating.distribution).map((key) => (
            <div
              key={key}
              className="grid grid-flow-col grid-cols-[15%_1fr_5%] items-center gap-1 sm:grid-cols-[20%_1fr_10%] sm:gap-2"
            >
              <p className="subtitle2">{`${key} Star`}</p>
              <div className="flex-1">
                <LinearProgress
                  variant="determinate"
                  value={
                    reviews?.length
                      ? (product.rating.distribution[
                          key as '1' | '2' | '3' | '4' | '5'
                        ] /
                          reviews.length) *
                        100
                      : 0
                  }
                  sx={{
                    borderRadius: 0.75,
                    height: 5,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 0.75,
                    },
                  }}
                />
              </div>
              <p className="body2 text-right">
                {
                  product.rating.distribution[
                    key as '1' | '2' | '3' | '4' | '5'
                  ]
                }
              </p>
            </div>
          ))}
        </div>
        <div className="grid items-center justify-center p-6">
          <Button
            color="primary"
            variant="outlined"
            size="large"
            sx={{ gap: 0.5 }}
            onClick={handleOpenForm}
          >
            <PencilIcon />
            Write a review
          </Button>
        </div>
      </div>
      <Divider />
      {formOpen && (
        <div ref={formContainerRef}>
          <div className="p-6">
            <ProductRatingReviewForm
              onClose={handleCloseForm}
              product={product}
            />
          </div>
          <Divider />
        </div>
      )}
      {isLoading || !reviews ? (
        <div className="grid place-items-center py-12">
          <CircularProgress />
        </div>
      ) : (
        <ProductRatingReviews reviews={reviews} />
      )}
    </Card>
  );
};
