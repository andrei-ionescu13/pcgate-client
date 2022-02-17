import { useMutation } from 'react-query';
import { setCart } from 'store/slices/cart';
import { useAppDispatch } from 'hooks/use-store-dispatch';
import { appAuthfetch } from 'utils/app-auth-fetch';

export const useAddCartItem = () => {
  const appDispatch = useAppDispatch();

  return useMutation((productId: string) => appAuthfetch('users/cart', {
    method: 'POST',
    body: JSON.stringify({ productId })
  }), {
    onSuccess: (data) => {
      appDispatch(setCart(data));
    }
  });
};

export const useRemoveCartItem = () => {
  const appDispatch = useAppDispatch();

  return useMutation((productId: string) => appAuthfetch('users/cart', {
    method: 'DELETE',
    body: JSON.stringify({ productId })
  }), {
    onSuccess: (data) => {
      appDispatch(setCart(data));
    }
  });
};

export const useCheckout = () => useMutation((currency: string) => appAuthfetch('checkout', {
  method: 'POST',
  body: JSON.stringify({ currency })
}), {
  onSuccess: ({ url }) => {
    window.location.href = url;
  }
});