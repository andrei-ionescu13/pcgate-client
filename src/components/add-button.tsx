'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from '@/i18n/navigation';
import { ShoppingCart } from '@/icons/shopping-cart';
import { setCart } from '@/store/slices/cart';
import { Cart } from '@/types/cart';
import { ApiError } from '@/utils/api-error';
import { appFetchAuth } from '@/utils/app-fetch';
import { cn } from '@/utils/cn';
import { useMutation } from '@tanstack/react-query';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Button, ButtonProps } from './button';

interface AddButtonProps extends ButtonProps {
  productId: string;
}

export const useAddToCart = () =>
  useMutation<Cart, ApiError, string>({
    mutationFn: (productId) =>
      appFetchAuth({
        url: '/auth/cart',
        config: {
          method: 'POST',
          body: JSON.stringify({ productId }),
        },
      }),
  });

export const AddButton: FC<AddButtonProps> = (props) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { productId, className, ...rest } = props;
  const addToCart = useAddToCart();
  const dispatch = useDispatch();

  const handleAddToCart = (): void => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    addToCart.mutate(productId, {
      onSuccess: (data) => {
        dispatch(setCart(data));
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Button
      color="primary"
      onClick={handleAddToCart}
      size="small"
      variant="contained"
      className={cn('min-w-16', className)}
      isLoading={addToCart.isPending}
      {...rest}
    >
      <ShoppingCart />
      Add
    </Button>
  );
};
