import type { FC, ElementType } from 'react';
import { Badge, Box, Button, Card, Divider, List, ListItem, Typography } from '@mui/material';
import type { ListItemProps } from '@mui/material';
import { Link } from '@/components/link';
import { ShoppingCart as ShoppingCartIcon } from '@/icons/shopping-cart';
import { useSettings } from '@/contexts/settings-context';
import { useStoreSelector } from '@/store/use-store-selector';
import type { CartLineItem } from '@/types/cart';

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
        }
      }}
      href={`/games/${product.slug}`}
      underline="none"
      {...props}
    >
      <Typography
        color="textPrimary"
        sx={{ justifySelf: 'start' }}
        variant="body3"
      >
        {product.title}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Typography
        color="textPrimary"
        variant="caption"
      >
        x
        {quantity}
      </Typography>
      <Box
        sx={{
          minWidth: 40,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Typography
          color="primary"
          variant="caption"
        >
          {settings.currency?.symbol}
          {finalPrice}
        </Typography>
      </Box>
    </ListItem>
  );
};

export const CartDropdown: FC = () => {
  const cart = useStoreSelector((state) => state.cart);

  return (
    <Box
      sx={{
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
        zIndex: 999999,
        '&:hover': {
          '& > div': {
            display: 'block'
          }
        }
      }}
    >
      <Link
        href='/cart'
        underline="none"
      >
        <Badge
          badgeContent={cart.itemCount}
          showZero
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#fff',
              color: '#000'
            }
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: '#1E4582',
              borderRadius: 2,
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              p: 1
            }}
          >
            <ShoppingCartIcon
              fontSize="small"
              sx={{ color: 'inherit' }}
            />
          </Box>
        </Badge>
      </Link>
      {(cart.items.length > 0) && (
        <Card
          sx={{
            display: 'none',
            position: 'absolute',
            right: 0,
            top: 36,
            width: 280
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            sx={{ m: 1 }}
            variant="subtitle2"
          >
            Latest products added
          </Typography>
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
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              px: 1,
              py: 1
            }}
          >
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              TOTAL:
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {cart.totalPrice}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 1 }}>
            <Button
              color="primary"
              component={Link}
              fullWidth
              href="/cart"
              variant="text"
            >
              View Cart
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};
