import { useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import numeral from 'numeral';
import { Box, Card, IconButton, Link, Typography } from '@material-ui/core';
import { ProductDiscount } from '../product-discount';
import { Steam as SteamIcon } from '../../icons/steam';
import { X as XIcon } from '../../icons/x';
import { useSettings } from '../../contexts/settings-context';
import { setCart } from '../../store/slices/cart';
import { useStoreDispatch } from '../../hooks/use-store-dispatch';
import { authFetch } from '../../utils/auth-fetch';
import type { Product } from '../../types/product';
import type { Cart } from '../../types/cart';

interface CartItemProps {
  item: {
    _id: string;
    product: Product;
  }
}

export const CartItem: FC<CartItemProps> = (props) => {
  const { item } = props;
  const { product } = item;
  const appDispatch = useStoreDispatch();
  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);

  const handleRemoveFromCart = async (): Promise<void> => {
    try {
      setLoading(true);
      const cart = await authFetch<Cart>('/users/cart', {
        method: 'DELETE',
        body: JSON.stringify({ productId: product?._id })
      });
      appDispatch(setCart(cart));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        display: 'flex',
        p: 1
      }}
    >
      <Box
        sx={{
          display: {
            sm: 'block',
            xs: 'none'
          },
          '& img': {
            borderRadius: 1,
            display: 'block',
            maxWidth: 140
          }
        }}
      >
        <Link
          component={RouterLink}
          to={`/games/${product.slug}`}
        >
          <img
            alt=""
            src={`https://fanatical.imgix.net/product/original/${product.cover}?auto=compress,format&w=350&fit=crop&h=197`}
          />
        </Link>
      </Box>
      <Box
        sx={{
          maxWidth: 300,
          ml: 2
        }}
      >
        <Link
          color="textPrimary"
          component={RouterLink}
          to={`/games/${product.slug}`}
          underline="none"
          variant="body2"
        >
          {product.name}
        </Link>
        <Box sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 1
        }}
        >
          <SteamIcon />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        {product.current_discount.display_percentage && <ProductDiscount percentage={product.current_discount.percent * 100} />}
        <Box sx={{ mx: 2 }}>
          {product.current_discount.display_percentage && (<Typography
            align="center"
            color="textSecondary"
            sx={{ textDecoration: 'line-through' }}
            variant="body2"
          >
            {settings.currencySymbol}
            {numeral(product.price[settings.currency] / 100).format('0,0.00')}
          </Typography>)}
          <Typography
            align="center"
            color="primary"
            component="p"
            variant="h6"
          >
            {settings.currencySymbol}
            {numeral(product.currentPrice[settings.currency] / 100).format('0,0.00')}
          </Typography>
        </Box>
        <IconButton
          color="primary"
          disabled={loading}
          onClick={handleRemoveFromCart}
        >
          <XIcon />
        </IconButton>
      </Box>
    </Card>
  );
};
