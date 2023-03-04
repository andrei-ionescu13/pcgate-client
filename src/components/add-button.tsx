import type { FC } from 'react'
import { Button } from '@/components/button'
import type { ButtonProps } from '@/components/button'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCart } from '@/store/slices/cart';
import { ShoppingCart as ShoppingCartIcon } from '@/icons/shopping-cart';
import { useMutation } from '@tanstack/react-query';
import { Cart } from '@/types/cart';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { useAuth } from '@/contexts/auth-context';

interface AddButtonProps extends ButtonProps {
  productId: string;
}

export const useAddToCart = () => useMutation<Cart, ApiError, string>((productId) => appFetch({
  url: '/auth/cart',
  withAuth: true,
  config: {
    method: 'POST',
    body: JSON.stringify({ productId }),
  }
}))

export const AddButton: FC<AddButtonProps> = (props) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { productId, ...rest } = props;
  const addToCart = useAddToCart();
  const dispatch = useDispatch();

  const handleAddToCart = (): void => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    addToCart.mutate(productId, {
      onSuccess: (data) => {
        dispatch(setCart(data))
      },
      onError: (error) => {
        toast.clearWaitingQueue();
        toast.error(error.message)
      },
    })
  }

  return (
    <Button
      color="primary"
      onClick={handleAddToCart}
      startIcon={<ShoppingCartIcon />}
      size="small"
      sx={{ minWidth: 68 }}
      variant="contained"
      isLoading={addToCart.isLoading}
      {...rest}
    />
  )
}
