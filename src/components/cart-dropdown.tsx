import { useState, useEffect } from 'react';
import type { FC, ElementType } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import numeral from 'numeral';
import { Badge, Box, Button, Card, Divider, Link, List, ListItem, Typography } from '@material-ui/core';
import type { ListItemProps } from '@material-ui/core';
import { ShoppingCart as ShoppingCartIcon } from '../icons/shopping-cart';
import { useSettings } from '../contexts/settings-context';
import { useStoreSelector } from '../hooks/use-store-selector';
import type { Product } from '../types/product';

interface CartDropdownItemProps extends ListItemProps {
  component?: ElementType;
  item: {
    _id: string;
    product: Product;
  };
}

const CartDropdownItem: FC<CartDropdownItemProps> = (props) => {
  const { item } = props;
  const { product } = item;
  const { settings } = useSettings();

  return (
    <ListItem
      component={RouterLink}
      sx={{
        display: 'flex',
        p: 1,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.mode === 'light' ? '#F8F8F8' : '#0A182D'
        }
      }}
      to={`/games/${product.slug}`}
      {...props}
    >
      <Typography
        color="textPrimary"
        sx={{ justifySelf: 'start' }}
        variant="body2"
      >
        {product.name}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          alignItems: 'flex-end',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          {settings.currencySymbol}
          {numeral(product.currentPrice[settings.currency] / 100).format('0,0.00')}
        </Typography>
        {product.current_discount.display_percentage && (
          <Typography
            color="textSecondary"
            sx={{ textDecoration: 'line-through' }}
            variant="caption"
          >
            {settings.currencySymbol}
            {numeral(product.price[settings.currency] / 100).format('0,0.00')}
          </Typography>
        )}
      </Box>
    </ListItem>
  );
};

export const CartDropdown: FC = () => {
  const { pathname } = useLocation();
  const { settings } = useSettings();
  const cart = useStoreSelector((state) => state.cart);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setHovered(false);
  }, [pathname]);

  return (
    <Box
      onMouseLeave={() => { setHovered(false); }}
      onMouseEnter={() => { setHovered(true); }}
      sx={{
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'static'
      }}
    >
      <Link
        component={RouterLink}
        to='/cart'
        underline="none"
      >
        <Badge
          badgeContent={cart?.items.length}
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
            {/* <Typography
              color="inherit"
              sx={{
                lineHeight: 'inherit',
                ml: 2
              }}
              variant="body2"
            >
              {settings.currencySymbol}
              {numeral(cart.currentPrice ? cart.currentPrice[settings.currency] / 100 : 0).format('0,0.00')}
            </Typography> */}
          </Box>
        </Badge>
      </Link>
      {(cart.currentPrice && cart.items.length > 0) && (
        <Card
          sx={{
            display: hovered ? 'block' : 'none',
            position: 'absolute',
            right: 0,
            top: 56,
            width: 280
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            sx={{ m: 1 }}
            variant="body2"
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
              {settings.currencySymbol}
              {numeral(cart.currentPrice[settings.currency] / 100).format('0,0.00')}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 1 }}>
            <Button
              color="primary"
              component={RouterLink}
              fullWidth
              to="/cart"
              variant="contained"
            >
              View Cart
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};
