import { useFormatCurrency } from '@/hooks/use-format-currency';
import { Link } from '@/i18n/navigation';
import { X } from '@/icons/x';
import { useStoreSelector } from '@/store/use-store-selector';
import { Drawer } from '@mui/material';
import { CartItem } from 'app/[locale]/(main)/cart/cart-item';
import type { FC } from 'react';
import { Button } from './button';
import { Divider } from './divider';
import { IconButton } from './icon-button';

interface CartDrawerProps {
  onClose: () => void;
  open: boolean;
}

export const CartDrawer: FC<CartDrawerProps> = (props) => {
  const { open, onClose } = props;
  const cart = useStoreSelector((state) => state.cart);
  const hasItems = !!cart.items.length;
  const formatCurrency = useFormatCurrency();

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          maxWidth: 600,
          width: '100%',
        },
      }}
      onClose={() => {
        onClose();
      }}
      open={open}
    >
      <div className="flex h-full flex-col p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3>My cart</h3>
          <IconButton
            onClick={onClose}
            className="-mr-2"
          >
            <X />
          </IconButton>
        </div>
        <ul className="flex flex-col gap-2">
          {hasItems ? (
            cart.items.map((item) => (
              <li key={item._id}>
                <CartItem
                  className="bg-neutral"
                  item={item}
                />
              </li>
            ))
          ) : (
            <div>
              <p>Cart is empty</p>
            </div>
          )}
        </ul>
        <div className="flex-1"></div>
        {hasItems && (
          <div>
            <div className="mb-5">
              <div className="body2 text-text-secondary flex items-center">
                <p>Full Price:</p>
                <div className="flex-1" />
                <p>{formatCurrency(cart.originalTotalPrice)}</p>
              </div>
              <div className="body2 flex items-center">
                <p className="text-text-secondary">Your saving:</p>
                <div className="flex-1" />
                <p className="text-success">
                  {formatCurrency(cart.totalDiscount)}
                </p>
              </div>
              <Divider className="my-2" />
              <div className="subtitle1 flex items-center">
                <p className="text-text-secondary">TOTAL</p>
                <div className="flex-1" />
                <p className="text-primary">
                  {formatCurrency(cart.totalPrice)}
                </p>
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
                onClick={onClose}
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
