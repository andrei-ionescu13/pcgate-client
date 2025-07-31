'use client';
import { Cart } from '@/types/cart';
import type { FC } from 'react';
import { CartItem } from './cart-item';

interface CartItemsProps {
  cart: Cart;
}

export const CartItems: FC<CartItemsProps> = (props) => {
  const { cart } = props;

  return (
    <div className="grid gap-2">
      {cart.items.map((item) => (
        <CartItem
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
};
