'use client';

import { CartItem } from '@/app/[locale]/(main)/cart/cart-item';
import { Link } from '@/i18n/navigation';
import { useCart } from '@/store/cart';
import { useLayout } from '@/store/layout';
import { Drawer } from '@mui/material';
import { XIcon } from 'lucide-react';
import { Amount } from './amount';
import { Button } from './button';
import { Divider } from './divider';
import { IconButton } from './icon-button';

export const CartDrawer = () => {
  const cart = useCart((state) => state.cart);
  const { openCartDrawer, handleCloseCartDrawer } = useLayout();
  const hasItems = !!cart?.items.length;

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      slotProps={{
        paper: {
          sx: {
            maxWidth: 600,
            width: '100%',
            overflow: 'hidden',
          },
        },
      }}

      onClose={() => {
        handleCloseCartDrawer();
      }}
      open={openCartDrawer}
    >
      <div className="flex h-full flex-1 flex-col p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3>My cart</h3>
          <IconButton
            onClick={handleCloseCartDrawer}
            className="-mr-2"
          >
            <XIcon />
          </IconButton>
        </div>
        {hasItems ? (
          <ul className="flex flex-1 flex-col gap-2 overflow-auto">
            {cart.items.map((item) => (
              <li key={item._id}>
                <CartItem
                  className="bg-neutral"
                  item={item}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p>Cart is empty</p>
          </div>
        )}
        {hasItems && (
          <div className="mt-5">
            <div className="mb-5">
              <div className="body2 text-text-secondary flex items-center">
                <p>Full Price:</p>
                <div className="flex-1" />
                <Amount>{cart.originalTotalPrice}</Amount>
              </div>
              <div className="body2 flex items-center">
                <p className="text-text-secondary">Your saving:</p>
                <div className="flex-1" />
                <Amount className="text-success">{cart.totalDiscount}</Amount>
              </div>
              <Divider className="my-2" />
              <div className="subtitle1 flex items-center">
                <p className="text-text-secondary">TOTAL</p>
                <div className="flex-1" />
                <Amount className="text-primary">{cart.totalPrice}</Amount>
              </div>
            </div>
            <Button
              asChild
              className="w-full"
              variant="contained"
              color="primary"
              size="large"
            >
              <Link
                href="/cart"
                onClick={handleCloseCartDrawer}
              >
                Checkout
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
};
