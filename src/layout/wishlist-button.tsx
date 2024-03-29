import type { FC, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import { HeartOutlined as HeartOutlinedIcon } from '@/icons/heart-outlined';
import { Heart as HeartIcon } from '@/icons/heart';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appFetch } from '@/utils/app-fetch';
import { useStoreSelector } from '@/store/use-store-selector';
import { addWishlistProduct, removeWishlistProduct } from '@/store/slices/wishlist';
import { ApiError } from '@/utils/api-error';

export const useAddToWishlist = (onSuccess?: any) => useMutation<string, ApiError, string>((productId) => appFetch({
  url: '/auth/wishlist',
  config: {
    body: JSON.stringify({ productId }),
    method: 'POST'
  },
}), { onSuccess })

export const useRemoveFromWishlist = (onSuccess?: any) => useMutation<string, ApiError, string>((productId) => appFetch({
  url: '/auth/wishlist',
  config: {
    body: JSON.stringify({ productId }),
    method: 'DELETE'
  },
}), { onSuccess })

interface WishlistButtonProps {
  productId: string;
}

export const WishlistButton: FC<WishlistButtonProps> = (props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { productId } = props;
  const dispatch = useDispatch();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const wishlistProducts = useStoreSelector((state) => state.wishlist.products);
  const isWishlisted = wishlistProducts.includes(productId);

  const handleAddToWishlist = async () => {
    addToWishlist.mutate(productId, {
      onSuccess: (data) => {
        dispatch(addWishlistProduct(data))
      },
      onError: (error) => {
        if (error.status === 401) router.push('/login')
      },
    });
  };

  const handleRemoveFromWishlist = async () => {
    removeFromWishlist.mutate(productId, {
      onSuccess: (data) => {
        dispatch(removeWishlistProduct(data))
      },
      onError: (error) => {
        if (error.status === 401) router.push('/login')
      },
    });
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (addToWishlist.isLoading || removeFromWishlist.isLoading) return;

    isWishlisted ? handleRemoveFromWishlist() : handleAddToWishlist()
  };

  return (
    <IconButton
      onClick={handleClick}
      size="small"
      sx={{
        mt: -0.5,
        alignSelf: 'flex-start',
        color: (theme) => isWishlisted ? 'error.dark' : (theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary'),
        '& :hover': {
          color: !isWishlisted ? '#fff' : undefined
        }
      }}
    >
      {isWishlisted ? <HeartIcon /> : <HeartOutlinedIcon />}
    </IconButton>
  );
};
