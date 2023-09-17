import type { FC } from "react";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appFetch } from "@/utils/app-fetch";
import { Button } from "@/components/button";
import type { ProductReview } from "@/types/product";
import { useRouter } from "next/router";

export const useDeleteReview = (onSuccess?: () => Promise<unknown>) =>
  useMutation<{}, Error, string>(
    (id) =>
      appFetch({
        url: `/reviews/${id}`,
        config: { method: "DELETE" },
        withAuth: true,
      }),
    { onSuccess }
  );

interface ProductRatingReviewProps {
  review: ProductReview;
}
export const ProductRatingReview: FC<ProductRatingReviewProps> = (props) => {
  const { review } = props;
  const { query } = useRouter();
  const { slug } = query as { slug: string };
  const queryClient = useQueryClient();
  const deleteReview = useDeleteReview(() =>
    Promise.all([
      queryClient.invalidateQueries(["product", slug]),
      queryClient.invalidateQueries(["product", slug, "reviews"]),
    ])
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          gap: 1,
          minWidth: {
            md: "240px",
          },
        }}
      >
        <Avatar />
        <Typography color="textPrimary" variant="subtitle2">
          {review.userName}
        </Typography>
        <Typography color="textSecondary" variant="caption">
          {format(new Date(review.createdAt), "dd MMMM yyyy")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flex: 1,
        }}
      >
        <Rating readOnly value={review.rating} precision={0.5} />
        <Typography
          color="textPrimary"
          variant="body2"
          sx={{ wordBreak: "break-all" }}
        >
          {review.content}
        </Typography>
        {review.hasDelete && (
          <Box
            sx={{
              display: "flex",
              mt: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              color="error"
              variant="text"
              isLoading={deleteReview.isLoading}
              onClick={() => {
                deleteReview.mutate(review._id);
              }}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
