'use client';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { IconButton } from '@/components/icon-button';
import { InputBase } from '@/components/input-base';
import { useCart } from '@/store/cart';
import type { Cart } from '@/types/cart';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useApplyCoupon = () =>
  useMutation<Cart, ApiError, string>({
    mutationFn: (code) =>
      appFetch<Cart>({
        url: '/cart/coupon',
        config: {
          method: 'POST',
          body: JSON.stringify({ code }),
        },
        withAuth: true,
      }),
  });

export const useRemoveCoupon = () =>
  useMutation<Cart, ApiError>({
    mutationFn: () =>
      appFetch<Cart>({
        url: '/cart/coupon',
        config: {
          method: 'DELETE',
        },
        withAuth: true,
      }),
  });

interface CartCouponProps {
  cart: Cart;
}

export const CartCoupon = ({ cart }: CartCouponProps) => {
  const couponApplied = cart.coupon;
  const setCart = useCart((state) => state.setCart);
  const queryClient = useQueryClient();
  const [code, setCode] = useState(couponApplied?.code || '');
  const [isApplied, setIsApplied] = useState(!!couponApplied);
  const applyCoupon = useApplyCoupon();
  const removeCoupon = useRemoveCoupon();

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value);
  };

  useEffect(() => {
    setCode(couponApplied?.code || '');
    setIsApplied(!!couponApplied);
  }, [couponApplied]);

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
                setCart(data);
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
            {code} <span className="text-text-secondary body3">Applied</span>
          </p>
          <div className="flex-1" />
          <IconButton
            size="small"
            disabled={removeCoupon.isPending}
            onClick={() => {
              removeCoupon.mutate(undefined, {
                onSuccess: (data) => {
                  queryClient.setQueryData(['cart'], data);
                  setCart(data);
                  setIsApplied(false);
                },
                onError: (error) => {
                  toast.error(error.message);
                },
              });
            }}
          >
            <X fontSize="small" />
          </IconButton>
        </div>
      )}
    </Card>
  );
};
