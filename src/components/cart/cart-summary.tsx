import type { FC } from 'react';
import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography
} from '@mui/material';
import { Gift as GiftIcon } from '@/icons/gift';
import type { Cart } from '@/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { Button } from '../button';
import { setCart } from '@/store/slices/cart';
import { useAppDispatch } from '@/store/use-store-dispatch';
import { useFormatCurrency } from '@/hooks/use-format-currency';

interface CartSummaryProps {
  cart: Cart;
}

export const useCreateOrder = (onError: (error: ApiError) => void) => useMutation<Cart, ApiError>(() => appFetch<any>({
  url: '/auth/order',
  withAuth: true,
  config: {
    method: 'POST'
  }
}), { onError })


export const CartSummary: FC<CartSummaryProps> = (props) => {
  const { cart } = props;
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const createOrder = useCreateOrder((error: ApiError): void => {
    if (error.status === 403) {
      queryClient.invalidateQueries(['cart']);
    }
  });
  const formatCurrency = useFormatCurrency();

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
        Cart Summary
      </Typography>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Full Price:
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          component="p"
          color="textSecondary"
          variant="body2"
        >
          {formatCurrency(cart.originalTotalPrice)}
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Your saving:
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          color="success.main"
          variant="body2"
        >
          {formatCurrency(cart.totalDiscount)}
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Typography
          color="textSecondary"
          variant="subtitle1"
        >
          TOTAL
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          component="p"
          color="primary"
          variant="subtitle1"
        >
          {formatCurrency(cart.totalPrice)}
        </Typography>
      </Box>
      <FormControlLabel
        disableTypography
        control={<Checkbox defaultChecked />}
        label={
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <GiftIcon fontSize="small" />
            <Typography
              color="textPrimary"
              sx={{
                lineHeight: 'inherit',
                ml: 0.5
              }}
              variant="body2"
            >
              Gift this order
            </Typography>
          </Box>
        }
      />
      <Button
        color="primary"
        fullWidth
        onClick={() => createOrder.mutate(undefined, {
          onSuccess: (data, variables, context) => {
            queryClient.setQueryData(['cart'], data)
            dispatch(setCart(data))
          },
        })}
        size="large"
        sx={{ mt: 1 }}
        variant="contained"
        disabled={cart.hasUnavailable}
        isLoading={createOrder.isLoading}
      >
        Proceed to checkout
      </Button>
    </Card>
  );
};
