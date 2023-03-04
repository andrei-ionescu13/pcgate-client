import { useEffect, useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Box, Card, InputBase, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { X as XIcon } from '@/icons/x';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import type { Cart } from '@/types/cart';
import { toast } from 'react-toastify';
import { setCart } from '@/store/slices/cart';
import { useAppDispatch } from '@/store/use-store-dispatch';
import { Button } from '../button';
import { Coupon } from '@/types/common';

export const useApplyCoupon = () => useMutation<Cart, ApiError, string>((code) => appFetch<Cart>({
  url: '/auth/cart/promo-code',
  config: {
    method: 'POST',
    body: JSON.stringify({ code }),
  }
}))

export const useRemoveCoupon = () => useMutation<Cart, ApiError>(() => appFetch<Cart>({
  url: '/auth/cart/promo-code',
  config: {
    method: 'DELETE',
  }
}))

interface CartCouponProps {
  promoCodeApplied?: Coupon;
}

export const CartCoupon: FC<CartCouponProps> = (props) => {
  const { promoCodeApplied } = props;
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
  }, [promoCodeApplied])


  return (
    <Card
      sx={{ p: 2 }}
      elevation={0}
    >
      <Typography
        color="textPrimary"
        sx={{ mb: 1.5 }}
        variant="h5"
      >
        Coupon
      </Typography>
      <Typography
        color="textSecondary"
        sx={{ mb: 1 }}
        variant="body2"
      >
        Do you have a coupon?
      </Typography>
      {!isApplied ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            applyCoupon.mutate(code, {
              onSuccess: (data) => {
                queryClient.setQueryData(['cart'], data);
                dispatch(setCart(data))
                setIsApplied(true)
              },
              onError: (error) => {
                toast.error(error.message)
              },
            })
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <InputBase
              inputProps={{
                onChange: handleCodeChange,
                sx: {
                  fontSize: 14,
                  px: 1.5,
                  py: 1
                },
                value: code
              }}
              placeholder="Enter coupon code"
              sx={{
                backgroundColor: 'background.default',
                flex: 1,
                borderTopLeftRadius: (theme) => theme.shape.borderRadius,
                borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
              }}
            />
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              type="submit"
              isLoading={applyCoupon.isLoading}
            >
              Apply
            </Button>
          </Box>
        </form>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            color="success.main"
            variant="subtitle2"
            component="p"
          >
            {code}
            {" "}
            <Typography
              color="textSecondary"
              variant="body3"
              component="span"
            >
              applied
            </Typography>
          </Typography>
          <Box sx={{ flex: 1 }} />
          <IconButton
            size="small"
            color="white"
            disabled={removeCoupon.isLoading}
            onClick={() => {
              removeCoupon.mutate(undefined, {
                onSuccess: (data) => {
                  queryClient.setQueryData(['cart'], data);
                  dispatch(setCart(data))
                  setIsApplied(false)
                },
              })
            }}
          >
            <XIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};
