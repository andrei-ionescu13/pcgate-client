'use client';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { IconButton } from '@/components/icon-button';
import { InputBase } from '@/components/input-base';
import { X as XIcon } from '@/icons/x';
import { setCart } from '@/store/slices/cart';
import { useAppDispatch } from '@/store/use-store-dispatch';
import type { Cart } from '@/types/cart';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useApplyCoupon = () =>
  useMutation<Cart, ApiError, string>({
    mutationFn: (code) =>
      appFetch<Cart>({
        url: '/auth/cart/promo-code',
        config: {
          method: 'POST',
          body: JSON.stringify({ code }),
        },
      }),
  });

export const useRemoveCoupon = () =>
  useMutation<Cart, ApiError>({
    mutationFn: () =>
      appFetch<Cart>({
        url: '/auth/cart/promo-code',
        config: {
          method: 'DELETE',
        },
      }),
  });

interface CartCouponProps {
  cart: Cart;
}

export const CartCoupon: FC<CartCouponProps> = (props) => {
  const { cart } = props;
  const promoCodeApplied = cart.promoCodeUsed;
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [code, setCode] = useState(promoCodeApplied?.code || '');
  const [isApplied, setIsApplied] = useState(!!promoCodeApplied);
  const applyCoupon = useApplyCoupon();
  const removeCoupon = useRemoveCoupon();

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value);
  };

  useEffect(() => {
    setCode(promoCodeApplied?.code || '');
    setIsApplied(!!promoCodeApplied);
  }, [promoCodeApplied]);

  return (
    <Card className="p-4">
      <h5>Coupon</h5>
      <p className="body2 text-text-secondary mb-2">Do you have a coupon?</p>
      {!isApplied ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            applyCoupon.mutate(code, {
              onSuccess: (data) => {
                queryClient.setQueryData(['cart'], data);
                dispatch(setCart(data));
                setIsApplied(true);
              },
              onError: (error) => {
                toast.error(error.message);
              },
            });
          }}
        >
          <div className="bg-default flex rounded-lg p-0.5">
            <InputBase
              onChange={handleCodeChange}
              className="flex-1 rounded-r-none"
              placeholder="Enter coupon code"
            />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              isLoading={applyCoupon.isPending}
            >
              Apply
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-center">
          <p className="text-success subtitle2">
            {code} <span className="text-text-secondary body3">applied</span>
          </p>
          <div className="flex-1" />
          <IconButton
            size="small"
            disabled={removeCoupon.isPending}
            onClick={() => {
              removeCoupon.mutate(undefined, {
                onSuccess: (data) => {
                  queryClient.setQueryData(['cart'], data);
                  dispatch(setCart(data));
                  setIsApplied(false);
                },
              });
            }}
          >
            <XIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </Card>
  );
};
