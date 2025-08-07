'use client';

import { IconButton } from '@/components/icon-button';
import { useRouter } from '@/i18n/navigation';
import { Heart as HeartIcon } from '@/icons/heart';
import { HeartOutlined as HeartOutlinedIcon } from '@/icons/heart-outlined';
import {
  addWishlistProduct,
  removeWishlistProduct,
} from '@/store/slices/wishlist';
import { useStoreSelector } from '@/store/use-store-selector';
import { ApiError } from '@/utils/api-error';
import { appFetchAuth } from '@/utils/app-fetch';
import { cn } from '@/utils/cn';
import { useMutation } from '@tanstack/react-query';
import type { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

export const useAddToWishlist = (onSuccess?: any) =>
  useMutation<string, ApiError, string>({
    mutationFn: (productId) =>
      appFetchAuth({
        url: '/auth/wishlist',
        config: {
          body: JSON.stringify({ productId }),
          method: 'POST',
        },
      }),
    onSuccess,
  });

export const useRemoveFromWishlist = (onSuccess?: any) =>
  useMutation<string, ApiError, string>({
    mutationFn: (productId) =>
      appFetchAuth({
        url: '/auth/wishlist',
        config: {
          body: JSON.stringify({ productId }),
          method: 'DELETE',
        },
      }),
    onSuccess,
  });

interface WishlistButtonProps {
  productId: string;
  refreshOnRemove?: boolean;
}

export const WishlistButton: FC<WishlistButtonProps> = (props) => {
  const router = useRouter();
  const { productId, refreshOnRemove } = props;
  const dispatch = useDispatch();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const wishlistProducts = useStoreSelector((state) => state.wishlist.products);
  const isWishlisted = wishlistProducts.includes(productId);

  const handleAddToWishlist = async () => {
    addToWishlist.mutate(productId, {
      onSuccess: (data) => {
        dispatch(addWishlistProduct(data));
      },
      onError: (error) => {
        if (error.status === 401) router.push('/login');
      },
    });
  };

  const handleRemoveFromWishlist = async () => {
    removeFromWishlist.mutate(productId, {
      onSuccess: (data) => {
        dispatch(removeWishlistProduct(data));
        refreshOnRemove && router.refresh();
      },
      onError: (error) => {
        if (error.status === 401) router.push('/login');
      },
    });
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (addToWishlist.isPending || removeFromWishlist.isPending) return;

    isWishlisted ? handleRemoveFromWishlist() : handleAddToWishlist();
  };

  const isPending = addToWishlist.isPending || removeFromWishlist.isPending;

  return (
    <IconButton
      onClick={handleClick}
      size="small"
      className={cn('-mt-1', isWishlisted && 'text-error-dark')}
      disabled={isPending}
    >
      {isWishlisted ? <HeartIcon /> : <HeartOutlinedIcon />}
    </IconButton>
  );
};
