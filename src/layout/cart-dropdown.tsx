import { Badge } from '@/components/badge';
import { Card } from '@/components/card';
import { useSettings } from '@/contexts/settings-context';
import { Link } from '@/i18n/navigation';
import { ShoppingCart as ShoppingCartIcon } from '@/icons/shopping-cart';
import { useStoreSelector } from '@/store/use-store-selector';
import type { CartLineItem } from '@/types/cart';
import type { ListItemProps } from '@mui/material';
import { Button, Divider, List, ListItem } from '@mui/material';
import type { ElementType, FC } from 'react';

interface CartDropdownItemProps extends ListItemProps {
  component?: ElementType;
  item: CartLineItem;
}

const CartDropdownItem: FC<CartDropdownItemProps> = (props) => {
  const { item } = props;
  const { product, finalPrice, quantity } = item;
  const { settings } = useSettings();

  return (
    <ListItem
      component={Link}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        '&:hover': {
          backgroundColor: 'background.neutral',
        },
      }}
      href={`/products/${product.slug}`}
      underline="none"
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
    </ListItem>
  );
};

export const CartDropdown: FC = () => {
  const cart = useStoreSelector((state) => state.cart);

  return (
    <div className="group relative z-10 flex items-center self-stretch">
      <Link href="/cart">
        <Badge content={cart.itemCount}>
          <div className="flex cursor-pointer items-center rounded-lg bg-[#1E4582] p-2 text-[#FFF]">
            <ShoppingCartIcon
              fontSize="small"
              sx={{ color: 'inherit' }}
            />
          </div>
        </Badge>
      </Link>
      {cart.items.length > 0 && (
        <Card className="absolute top-9 right-0 z-20 hidden w-[280px] group-hover:block">
          <p className="subtitle2 my-2 mr-2 text-center">
            Latest products added
          </p>
          <Divider />
          <List disablePadding>
            {cart.items.map((item) => (
              <CartDropdownItem
                divider
                key={item._id}
                item={item}
              />
            ))}
          </List>
          <div className="flex items-center p-2">
            <p className="subtitle2">TOTAL:</p>
            <div className="flex-1" />
            <p className="subtitle2">{cart.totalPrice}</p>
          </div>
          <Divider />
          <div className="p-2">
            <Button
              color="primary"
              component={Link}
              fullWidth
              href="/cart"
              variant="text"
            >
              View Cart
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
