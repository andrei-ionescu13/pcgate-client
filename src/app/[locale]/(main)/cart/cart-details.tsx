'use client';
import { Cart } from '@/types/cart';
import type { FC } from 'react';
import { useCart } from './api-hooks';
import { CartAlerts } from './cart-alerts';
import { CartCoupon } from './cart-coupon';
import { CartEmpty } from './cart-empty';
import { CartItems } from './cart-items';
import { CartSummary } from './cart-summary';

interface CartDetailsProps {
  initialCart: Cart;
}

export const CartDetails: FC<CartDetailsProps> = (props) => {
  const { initialCart } = props;
  const { data: cart } = useCart(initialCart);

  if (!cart.items.length) {
    return <CartEmpty />;
  }

  return (
    <div className="grid gap-6">
      <CartAlerts cart={cart} />
      <div className="grid gap-6 md:grid-cols-[8fr_4fr]">
        <div>
          <CartItems cart={cart} />
        </div>
        <div className="grid gap-6">
          <CartSummary cart={cart} />
          <CartCoupon cart={cart} />
        </div>
      </div>
    </div>
  );
};
