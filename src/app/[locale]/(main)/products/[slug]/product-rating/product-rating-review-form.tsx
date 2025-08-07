'use client';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from '@/i18n/navigation';
import type { Product } from '@/types/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { Rating, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useCreateReview } from '../api-hooks';

interface FormValues {
  content: string;
  rating: number;
}

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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      content: '',
      rating: 0,
    },
    resolver: yupResolver(
      Yup.object({
        content: Yup.string().required('Required'),
        rating: Yup.number().required('Required'),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
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
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="subtitle1">Add Review</p>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <p className="body2">Your review about this product:</p>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Rating
                  value={field.value}
                  onChange={(_, newValue) => field.onChange(newValue)}
                />
              )}
            />
          </div>

          <TextField
            {...register('content')}
            size="small"
            error={!!errors.content}
            fullWidth
            helperText={errors.content?.message}
            id="content"
            label="Review"
            minRows={6}
            maxRows={12}
            multiline
            name="content"
          />
          <div className="flex justify-end gap-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              color="primary"
              variant="contained"
              isLoading={createReview.isPending}
              type="submit"
            >
              Post review
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
