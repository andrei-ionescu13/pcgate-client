'use client';

import { Amount } from '@/components/amount';
import { Card } from '@/components/card';
import { IconButton } from '@/components/icon-button';
import { Link } from '@/i18n/navigation';
import { SteamIcon } from '@/icons/steam';
import { useCart } from '@/store/cart';
import type { Cart, CartLineItem } from '@/types/cart';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { cn } from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';
import { AppImage } from '../../../../components/app-image';
import { CartItemQuantity } from './cart-item-quantity';

interface CartItemProps {
  item: CartLineItem;
  className?: string;
}

export const useRemoveFromCart = () =>
  useMutation<Cart, ApiError, string>({
    mutationFn: (itemId) =>
      appFetch({
        url: '/auth/cart',
        config: {
          method: 'DELETE',
          body: JSON.stringify({ itemId }),
        },
        withAuth: true,
      }),
  });

export const useUpdateQuantity = () =>
  useMutation<Cart, ApiError, { productId: string; quantity: number }>({
    mutationFn: ({ productId, quantity }) =>
      appFetch({
        url: '/auth/cart/quantity',
        config: {
          method: 'PUT',
          body: JSON.stringify({ productId, quantity }),
        },
        withAuth: true,
      }),
  });

export const CartItem = ({ item, className }: CartItemProps) => {
  const queryClient = useQueryClient();
  const removeFromCart = useRemoveFromCart();
  const updateQuantity = useUpdateQuantity();
  const setCart = useCart((state) => state.setCart);
  const { product } = item;

  const handleRemoveFromCart = () => {
    removeFromCart.mutate(item._id, {
      onSuccess: (data) => {
        queryClient.setQueryData(['cart'], data);
        setCart(data);
      },
    });
  };

  const handleUpdateQuantity = (quantity: number): void => {
    updateQuantity.mutate(
      { productId: item.productId, quantity },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['cart'], data);
          setCart(data);
        },
      }
    );
  };

  return (
    <Card
      color="paper"
      className={cn(
        'relative flex flex-col gap-4 p-2 sm:flex-row sm:items-center',
        (removeFromCart.isPending || updateQuantity.isPending) && 'opacity-40',
        className
      )}
    >
      {removeFromCart.isPending ||
        (updateQuantity.isPending && <div className="absolute inset-0 z-50" />)}
      <Link
        className={cn(
          'relative block w-full overflow-hidden rounded-lg sm:max-w-35',
          item.isUnavailable && 'grayscale-75'
        )}
        href={`/products/${product.slug}`}
      >
        <div className="relative aspect-video">
          <AppImage
            fill
            src={product.cover.public_id}
            alt={product.title}
          />
        </div>
      </Link>
      <div className="flex">
        <div className="max-w-[300px]">
          <Link
            color="textPrimary"
            href={`/products/${product.slug}`}
            className="body2"
          >
            {product.title}
          </Link>
          <div className="mt-2 flex items-center">
            <SteamIcon />
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center justify-end">
        {item.isUnavailable ? (
          <p className="text-error subtitle1 mr-4">Unavailable</p>
        ) : (
          <>
            <CartItemQuantity
              quantity={item.quantity}
              maxQuantity={item.maxQuantity}
              onUpdateQuantity={handleUpdateQuantity}
              hideButtons={item.promoCodeIsApplied}
            />
            <div className="mx-4 flex min-w-[60px] flex-col justify-center">
              {item.originalLinePrice !== item.finalLinePrice && (
                <Amount className="text-text-secondary body2 text-center line-through">
                  {item.originalLinePrice}
                </Amount>
              )}
              <Amount
                className={cn(
                  'subtitle1 text-center',
                  item.promoCodeIsApplied ? 'text-success' : 'text-primary'
                )}
              >
                {item.finalLinePrice}
              </Amount>
            </div>
          </>
        )}
        <IconButton
          size="small"
          onClick={handleRemoveFromCart}
        >
          <XIcon />
        </IconButton>
      </div>
    </Card>
  );
};
