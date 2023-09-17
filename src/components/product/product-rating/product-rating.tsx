import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Pencil as PencilIcon } from "@/icons/pencil";
import { ProductRatingReviewForm } from "./product-rating-review-form";
import type { Product, ProductReview } from "@/types/product";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { ProductRatingReviews } from "./product-rating-reviews";
import { appFetch } from "@/utils/app-fetch";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface ProductRatingProps {
  product: Product;
}

export const ProductRating: FC<ProductRatingProps> = (props) => {
  const { product } = props;
  const scrollTo = useScrollTo();
  const [formOpen, setFormOpen] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const { query } = useRouter();
  const { slug } = query as { slug: string };
  const listProductReviews = (slug: string) => () =>
    appFetch<ProductReview[]>({ url: `/products/${slug}/reviews` });
  const { data: reviews, isLoading } = useQuery(
    ["product", slug, "reviews"],
    listProductReviews(slug)
  );

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
      <Grid
        container
        sx={{
          "> div": {
            p: 3,
            display: "grid",
            alignItems: "center",
          },
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Typography color="textPrimary" variant="subtitle1">
            Average rating
          </Typography>
          <Typography color="textPrimary" variant="h2">
            {product.rating.average}
            /5
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            borderRight: (theme) => ({
              md: `1px solid ${theme.palette.divider}`,
            }),
            borderLeft: (theme) => ({
              md: `1px solid ${theme.palette.divider}`,
            }),
          }}
        >
          {Object.keys(product.rating.distribution).map((key) => (
            <Box
              key={key}
              sx={{
                display: "grid",
                gridAutoFlow: "column",
                gridTemplateColumns: {
                  sm: "15% 1fr 5%",
                  xs: "20% 1fr 10%",
                },
                alignItems: "center",
                gap: {
                  sm: 2,
                  xs: 1,
                },
              }}
            >
              <Typography
                color="textPrimary"
                sx={{ whiteSpace: "nowrap" }}
                variant="subtitle2"
              >
                {`${key} Star`}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={
                    reviews?.length
                      ? (product.rating.distribution[
                          key as "1" | "2" | "3" | "4" | "5"
                        ] /
                          reviews.length) *
                        100
                      : 0
                  }
                  sx={{
                    borderRadius: 0.75,
                    height: 5,
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 0.75,
                    },
                  }}
                />
              </Box>
              <Typography color="textPrimary" variant="body2" textAlign="right">
                {
                  product.rating.distribution[
                    key as "1" | "2" | "3" | "4" | "5"
                  ]
                }
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={4} sx={{ justifyContent: "center" }}>
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
        </Grid>
      </Grid>
      <Divider />
      {formOpen && (
        <Box id="yy" ref={formContainerRef}>
          <Box sx={{ p: 3 }}>
            <ProductRatingReviewForm
              onClose={handleCloseForm}
              product={product}
            />
          </Box>
          <Divider />
        </Box>
      )}
      {isLoading || !reviews ? (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            py: 6,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ProductRatingReviews reviews={reviews} />
      )}
    </Card>
  );
};
