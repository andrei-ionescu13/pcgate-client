'use client';

import { IconButton } from '@/components/icon-button';
import { useRouter } from '@/i18n/navigation';
import { useWishlist } from '@/store/wishlist';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { cn } from '@/utils/cn';
import { useMutation } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { toast } from 'sonner';

export const useAddToWishlist = (onSuccess?: any) =>
  useMutation<string, ApiError, string>({
    mutationFn: (productId) =>
      appFetch({
        url: '/auth/wishlist',
        config: {
          body: JSON.stringify({ productId }),
          method: 'POST',
        },
        withAuth: true,
      }),
    onSuccess,
  });

export const useRemoveFromWishlist = (onSuccess?: any) =>
  useMutation<string, ApiError, string>({
    mutationFn: (productId) =>
      appFetch({
        url: '/auth/wishlist',
        config: {
          body: JSON.stringify({ productId }),
          method: 'DELETE',
        },
        withAuth: true,
      }),
    onSuccess,
  });

interface WishlistButtonProps {
  productId: string;
  refreshOnRemove?: boolean;
}

export const WishlistButton = ({
  productId,
  refreshOnRemove,
}: WishlistButtonProps) => {
  const router = useRouter();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const {
    addWishlistProduct,
    removeWishlistProduct,
    products: wishlistProducts,
  } = useWishlist();
  const isWishlisted = wishlistProducts.includes(productId);

  const handleAddToWishlist = async () => {
    addToWishlist.mutate(productId, {
      onSuccess: (data) => {
        addWishlistProduct(data);
        toast.success('Product added to wishlist');
      },
      onError: (error) => {
        if (error.status === 401) router.push('/login');
      },
    });
  };

  const handleRemoveFromWishlist = async () => {
    removeFromWishlist.mutate(productId, {
      onSuccess: (data) => {
        removeWishlistProduct(data);
        toast.success('Product removed from wishlist');
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
      className="-mt-1"
      disabled={isPending}
    >
      <HeartIcon
        className={cn(
          isWishlisted ? 'fill-error-dark text-error-dark' : 'hover:fill-white'
        )}
      />
    </IconButton>
  );
};
