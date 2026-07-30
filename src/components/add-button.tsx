'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from '@/i18n/navigation';
import { useCart } from '@/store/cart';
import type { Cart } from '@/types/cart';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { cn } from '@/utils/cn';
import { useMutation } from '@tanstack/react-query';
import { ShoppingCartIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button, type ButtonProps } from './button';

interface AddButtonProps extends ButtonProps {
  productId: string;
}

export const useAddToCart = () =>
  useMutation<Cart, ApiError, string>({
    mutationFn: (productId) =>
      appFetch({
        url: '/auth/cart',
        config: {
          method: 'POST',
          body: JSON.stringify({ productId }),
        },
        withAuth: true,
      }),
  });

export const AddButton = ({
  productId,
  className,
  ...rest
}: AddButtonProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const addToCart = useAddToCart();
  const setCart = useCart((state) => state.setCart);

  const handleAddToCart = (): void => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    addToCart.mutate(productId, {
      onSuccess: (data) => {
        setCart(data);
        toast.success('Product added to cart');
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
      <ShoppingCartIcon />
      Add
    </Button>
  );
};
