import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { CartItem } from '../components/cart/cart-item';
import { CartSummary } from '../components/cart/cart-summary';
import { CartCoupon } from '../components/cart/cart-coupon';
import { CartEmpty } from '../components/cart/cart-empty';
import { useStoreSelector } from '../hooks/use-store-selector';

export const Cart: FC = () => {
  const cart = useStoreSelector((state) => state.cart);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flex: 1,
          py: 5
        }}
      >
        <Container maxWidth="lg">
          <Typography
            color="textPrimary"
            variant="h4"
            sx={{ mb: 2 }}
          >
            Cart
          </Typography>
          {cart.items.length > 0 ? (
            <Grid
              container
              spacing={3}
            >
              <Grid
                container
                item
                lg={9}
                md={8}
                spacing={3}
                sx={{ height: 'fit-content' }}
                xs={12}
              >
                {cart.items.map((item) => (
                  <Grid
                    item
                    key={item._id}
                    xs={12}
                  >
                    <CartItem item={item} />
                  </Grid>
                ))}
              </Grid>
              <Grid
                container
                item
                lg={3}
                md={4}
                spacing={3}
                sx={{ height: 'fit-content' }}
                xs={12}
              >
                <Grid
                  item
                  xs={12}
                >
                  <CartSummary cart={cart} />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <CartCoupon />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <CartEmpty />
          )}
        </Container>
      </Box>
    </>
  );
};
