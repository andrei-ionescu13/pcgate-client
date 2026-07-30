'use client';

import { Badge } from '@/components/badge';
import { useCart } from '@/store/cart';
import { useLayout } from '@/store/layout';
import { ShoppingCartIcon } from 'lucide-react';

export const CartButton = () => {
  const cart = useCart((state) => state.cart);
  const handleOpenCartDrawer = useLayout((state) => state.handleOpenCartDrawer);

  return (
    <Badge content={cart?.itemCount}>
      <button
        className="flex cursor-pointer items-center rounded-lg bg-[#1E4582] p-2 text-[#FFF]"
        onClick={handleOpenCartDrawer}
      >
        <ShoppingCartIcon />
      </button>
    </Badge>
  );
};
