import type { FC } from "react";
import { Card, Rating, TextField, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import { Button } from "@/components/button";
import { appFetch } from "@/utils/app-fetch";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth-context";

export const useCreateReview = (onSuccess: () => Promise<unknown>) =>
  useMutation<{}, Error, Record<string, string | number>>(
    (values) =>
      appFetch({
        url: "/reviews",
        withAuth: true,
        config: {
          body: JSON.stringify(values),
          method: "POST",
        },
      }),
    { onSuccess }
  );

interface ProductRatingReviewFormProps {
  onClose: () => void;
  product: Product;
}

export const ProductRatingReviewForm: FC<ProductRatingReviewFormProps> = (
  props
) => {
  const { onClose, product } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const createReview = useCreateReview(() =>
    queryClient.invalidateQueries(["product", product.slug])
  );

  console.log(isAuthenticated);

  const formik = useFormik({
    initialValues: {
      userName: "",
      content: "",
      rating: 0,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      content: Yup.string().required("Required"),
      rating: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      createReview.mutate(
        { ...values, product: product._id },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => console.log(error.message),
        }
      );
    },
  });

  return (
    <Card sx={{ p: 3 }} elevation={4}>
      <Typography color="textPrimary" variant="subtitle1">
        Add Review
      </Typography>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography color="textPrimary" variant="body2">
            Your review about this product:
          </Typography>
          <Rating
            value={formik.values.rating}
            onChange={(_, newValue) => {
              formik.setFieldValue("rating", newValue);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            error={!!formik.touched.userName && !!formik.errors.userName}
            helperText={formik.touched.userName && formik.errors.userName}
            fullWidth
            id="userName"
            label="Your name"
            name="userName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.userName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            error={!!formik.touched.content && !!formik.errors.content}
            fullWidth
            helperText={formik.touched.content && formik.errors.content}
            id="content"
            label="Review"
            minRows={6}
            maxRows={12}
            multiline
            name="content"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.content}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button color="white" variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              formik.handleSubmit();
            }}
            isLoading={createReview.isLoading}
          >
            Post review
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
