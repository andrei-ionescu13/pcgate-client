import { FC } from 'react';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { Link } from '@/components/link';
import { Steam as SteamIcon } from '@/icons/steam';
import { X as XIcon } from '@/icons/x';
import { useSettings } from '@/contexts/settings-context';
import { AppImage } from '../../app-image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Cart, CartLineItem } from '@/types/cart';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { useDispatch } from 'react-redux';
import { setCart } from '@/store/slices/cart';
import { CartItemQuantity } from './cart-item-quantity';

interface CartItemProps {
  item: CartLineItem;
}

export const useRemoveFromCart = () => useMutation<Cart, ApiError, string>((itemId) => appFetch({
  url: '/auth/cart',
  config: {
    method: 'DELETE',
    body: JSON.stringify({ itemId }),
  }
}))

export const useUpdateQuantity = () => useMutation<Cart, ApiError, { productId: string; quantity: number; }>(({ productId, quantity }) => appFetch({
  url: '/auth/cart/quantity',
  config: {
    method: 'PUT',
    body: JSON.stringify({ productId, quantity }),
  }
}))

export const CartItem: FC<CartItemProps> = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const removeFromCart = useRemoveFromCart();
  const { product } = item;
  const updateQuantity = useUpdateQuantity();
  const { settings } = useSettings();
  const currencySymbol = settings.currency?.symbol;

  const handleRemoveFromCart = () => {
    removeFromCart.mutate(item._id, {
      onSuccess: (data) => {
        queryClient.setQueryData(['cart'], data);
        dispatch(setCart(data))
      }
    })
  }

  const handleUpdateQuantity = (quantity: number): void => {
    updateQuantity.mutate({ productId: item.productId, quantity }, {
      onSuccess: (data) => {
        queryClient.setQueryData(['cart'], data);
        dispatch(setCart(data))
      }
    })
  }

  return (
    <Card
      elevation={0}
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        display: 'flex',
        p: 1,
        position: 'relative',
        opacity: removeFromCart.isLoading || updateQuantity.isLoading ? 0.4 : undefined
      }}
    >
      {removeFromCart.isLoading || updateQuantity.isLoading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 999,
          }}
        />
      )}
      <Link
        sx={{
          display: 'block',
          width: 140,
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden',
          filter: item.isUnavailable ? 'grayscale(80%)' : undefined
        }}
        href={`/games/${product.slug}`}
      >
        <AppImage
          layout="responsive"
          width={16}
          height={9}
          src={product.cover.public_id}
          alt={product.title}
          sizes="
                (min-width: 1200px) 400px,
                (min-width: 900px) 33vw,
                (min-width: 600px) 50vw"
        />
      </Link>
      <Box
        sx={{
          maxWidth: 300,
          ml: 2
        }}
      >
        <Link
          color="textPrimary"
          href={`/games/${product.slug}`}
          underline="none"
          variant="body2"
        >
          {product.title}
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
        {item.isUnavailable ? (
          <Typography
            color="error"
            variant="subtitle1"
            mr={2}
          >
            Unavailable
          </Typography>
        ) : (
          <>
            <CartItemQuantity
              quantity={item.quantity}
              maxQuantity={item.maxQuantity}
              onUpdateQuantity={handleUpdateQuantity}
              hideButtons={item.promoCodeIsApplied}
            />
            <Box sx={{
              mx: 2,
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 60
            }}
            >
              {item.originalLinePrice !== item.finalLinePrice && (
                <Typography
                  align="center"
                  color="textSecondary"
                  sx={{ textDecoration: 'line-through' }}
                  variant="body2"
                >
                  {currencySymbol}
                  {item.originalLinePrice}
                </Typography>
              )}
              <Typography
                align="center"
                color={item.promoCodeIsApplied ? 'success.main' : 'primary'}
                component="p"
                variant="h6"
              >
                {currencySymbol}
                {item.finalLinePrice}
              </Typography>
            </Box>
          </>
        )}
        <IconButton
          size="small"
          color="white"
          // disabled={isLoading}
          onClick={handleRemoveFromCart}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};
