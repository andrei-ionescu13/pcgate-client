'use client';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Divider } from '@/components/divider';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import { useRouter } from '@/i18n/navigation';
import { Gift as GiftIcon } from '@/icons/gift';
import { useAppDispatch } from '@/store/use-store-dispatch';
import type { Cart } from '@/types/cart';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';

interface CartSummaryProps {
  cart: Cart;
}

export const useCreateOrder = (onError: (error: ApiError) => void) =>
  useMutation<Cart, ApiError>({
    mutationFn: () =>
      appFetch<any>({
        url: '/auth/order',
        withAuth: true,
        config: {
          method: 'POST',
        },
      }),
    onError,
  });

export const CartSummary: FC<CartSummaryProps> = (props) => {
  const { cart } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const createOrder = useCreateOrder((error: ApiError): void => {
    if (error.status === 403) {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  const formatCurrency = useFormatCurrency();

  const checkout = async () => {
    const url = await appFetch<string>({
      url: '/auth/checkout',
      config: {
        method: 'POST',
      },
    });

    router.push(url);
  };

  return (
    <Card className="p-4">
      <h5 className="mb-3">Cart Summary</h5>
      <div className="body2 text-text-secondary flex items-center">
        <p>Full Price:</p>
        <div className="flex-1" />
        <p>{formatCurrency(cart.originalTotalPrice)}</p>
      </div>
      <div className="body2 flex items-center">
        <p className="text-text-secondary">Your saving:</p>
        <div className="flex-1" />
        <p className="text-success">{formatCurrency(cart.totalDiscount)}</p>
      </div>
      <Divider className="my-2" />
      <div className="subtitle1 flex items-center">
        <p className="text-text-secondary">TOTAL</p>
        <div className="flex-1" />
        <p className="text-primary">{formatCurrency(cart.totalPrice)}</p>
      </div>
      <FormControlLabel
        disableTypography
        control={<Checkbox defaultChecked />}
        label={
          <div className="flex items-center">
            <GiftIcon fontSize="small" />
            <p className="body2 mt-0.5 ml-1">Gift this order</p>
          </div>
        }
      />
      <Button
        color="primary"
        className="mt-2 w-full"
        onClick={() => {
          checkout();
        }}
        // onClick={() => createOrder.mutate(undefined, {
        //   onSuccess: (data) => {
        //     queryClient.setQueryData(['cart'], data)
        //     dispatch(setCart(data))
        //   },
        // })}
        size="large"
        variant="contained"
        disabled={cart.hasUnavailable}
        isLoading={createOrder.isPending}
      >
        Proceed to checkout
      </Button>
      <p className="mt-4">Test card: 4242424242424242</p>
    </Card>
  );
};
