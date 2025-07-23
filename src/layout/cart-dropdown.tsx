import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Divider } from '@/components/divider';
import { useSettings } from '@/contexts/settings-context';
import { Link } from '@/i18n/navigation';
import { ShoppingCart as ShoppingCartIcon } from '@/icons/shopping-cart';
import { useStoreSelector } from '@/store/use-store-selector';
import type { CartLineItem } from '@/types/cart';
import type { FC } from 'react';

interface CartDropdownItemProps {
  item: CartLineItem;
}

const CartDropdownItem: FC<CartDropdownItemProps> = (props) => {
  const { item } = props;
  const { product, finalPrice, quantity } = item;
  const { settings } = useSettings();

  return (
    <li>
      <Link
        className="hover:bg-neutral inline-flex w-full items-center p-2"
        href={`/products/${product.slug}`}
        {...props}
      >
        <p className="body3 justify-self-start">{product.title}</p>
        <div className="flex-1" />
        <p className="caption">x{quantity}</p>
        <div className="flex min-w-10 justify-end">
          <p className="caption text-primary">
            {settings.currency?.symbol}
            {finalPrice}
          </p>
        </div>
      </Link>
    </li>
  );
};

export const CartDropdown: FC = () => {
  const cart = useStoreSelector((state) => state.cart);

  return (
    <div className="group relative z-10 flex items-center self-stretch">
      <Link href="/cart">
        <Badge content={cart.itemCount}>
          <div className="flex cursor-pointer items-center rounded-lg bg-[#1E4582] p-2 text-[#FFF]">
            <ShoppingCartIcon />
          </div>
        </Badge>
      </Link>
      {cart.items.length > 0 && (
        <Card className="absolute top-9 right-0 z-20 hidden w-[280px] group-hover:block">
          <p className="subtitle2 my-2 mr-2 text-center">
            Latest products added
          </p>
          <Divider />
          <ul>
            {cart.items.map((item) => (
              <CartDropdownItem
                key={item._id}
                item={item}
              />
            ))}
          </ul>
          <div className="flex items-center p-2">
            <p className="subtitle2">TOTAL:</p>
            <div className="flex-1" />
            <p className="subtitle2">{cart.totalPrice}</p>
          </div>
          <Divider />
          <div className="p-2">
            <Button
              asChild
              color="primary"
              variant="contained"
              className="w-full"
            >
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
