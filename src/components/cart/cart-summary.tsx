import { useState } from 'react';
import type { FC } from 'react';
import numeral from 'numeral';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography
} from '@material-ui/core';
import { Gift as GiftIcon } from '../../icons/gift';
import { useSettings } from '../../contexts/settings-context';
import { authFetch } from '../../utils/auth-fetch';
import type { Cart } from '../../types/cart';

interface CartSummaryProps {
  cart: Cart;
}

export const CartSummary: FC<CartSummaryProps> = (props) => {
  const { cart } = props;
  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const { url } = await authFetch<{ url: string }>('/checkout', {
        method: 'POST',
        body: JSON.stringify({ currency: settings.currency })
      });
      window.location.href = url;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

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
          variant="subtitle2"
        >
          {settings.currencySymbol}
          {numeral(cart.price ? cart.price[settings.currency] / 100 : 0).format('0,0.00')}
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
          component="p"
          color="success.main"
          variant="subtitle2"
        >
          {settings.currencySymbol}
          {numeral((cart.price && cart.currentPrice) ? ((cart.price[settings.currency] - cart.currentPrice[settings.currency]) / 100) : 0).format('0,0.00')}
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
          {settings.currencySymbol}
          {numeral(cart.currentPrice ? cart.currentPrice[settings.currency] / 100 : 0).format('0,0.00')}
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
        disabled={loading}
        fullWidth
        onClick={handleClick}
        size="large"
        sx={{ mt: 1 }}
        variant="contained"
      >
        Proceed to checkout
      </Button>
    </Card>
  );
};
