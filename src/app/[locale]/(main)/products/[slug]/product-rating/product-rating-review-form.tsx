'use client';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from '@/i18n/navigation';
import type { Product } from '@/types/product';
import { Rating, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import type { FC } from 'react';
import * as Yup from 'yup';
import { useCreateReview } from '../api-hooks';

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

  const createReview = useCreateReview(() => {
    router.refresh();

    return Promise.all([
      // queryClient.invalidateQueries({ queryKey: ['product', product.slug] }),
      queryClient.invalidateQueries({
        queryKey: ['product', product.slug, 'reviews'],
      }),
    ]);
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      rating: 0,
    },
    validationSchema: Yup.object({
      content: Yup.string().required('Required'),
      rating: Yup.number().required('Required'),
    }),
    onSubmit: async (values) => {
      if (!isAuthenticated) {
        router.push('/login');
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
    <Card className="p-6">
      <p className="subtitle1">Add Review</p>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <p className="body2">Your review about this product:</p>
          <Rating
            value={formik.values.rating}
            onChange={(_, newValue) => {
              formik.setFieldValue('rating', newValue);
            }}
          />
        </div>

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
        <div className="flex justify-end gap-4">
          <Button
            color="white"
            variant="text"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              formik.handleSubmit();
            }}
            isLoading={createReview.isPending}
          >
            Post review
          </Button>
        </div>
      </div>
    </Card>
  );
};
