'use client';

import { useMutation } from '@tanstack/react-query';
import { deleteReview } from './api';

export const useDeleteReview = (onSuccess: any) =>
  useMutation<{}, Error, string>({
    mutationFn: deleteReview,
    onSuccess,
  });
