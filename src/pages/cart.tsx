import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { Alert, Box, Container, Grid, Typography } from '@mui/material';
import { CartItem } from '@/components/cart/cart-item/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { CartCoupon } from '@/components/cart/cart-coupon';
import { CartEmpty } from '@/components/cart/cart-empty';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { appFetch } from '@/utils/app-fetch';
import { useEffect, useState } from 'react';
import { setCart } from '@/store/slices/cart';
import { useDispatch } from 'react-redux';
import type { Cart } from '@/types/cart';
import { NextPageWithLayout } from './_app';
import { Layout } from 'layout/layout';

const getCart = (config: Record<string, any> = {}) => () => appFetch<Cart>({
  url: '/auth/cart',
  withAuth: true,
  ...config
})

const Cart: NextPageWithLayout = () => {
  const { data: cart } = useQuery(['cart'], getCart(), { staleTime: 99999999 });
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(cart?.hasPriceChanged || cart?.hasQuantityChanged || cart?.hasUnavailable);
  const [alertSeverity, setAlertSeverity] = useState<'error' | 'warning'>(cart?.hasUnavailable ? 'error' : 'warning')

  useEffect(() => {
    setShowAlert(cart?.hasPriceChanged || cart?.hasQuantityChanged || cart?.hasUnavailable)
    setAlertSeverity(cart?.hasUnavailable ? 'error' : 'warning')
  }, [cart?.hasPriceChanged, cart?.hasQuantityChanged, cart?.hasUnavailable])

  useEffect(() => {
    cart && dispatch(setCart(cart))
  }, [cart])

  if (!cart) return null;

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
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
          {cart.items.length ? (
            <Grid
              container
              spacing={3}
            >
              {showAlert && (
                <Grid
                  item
                  xs={12}
                >
                  <Alert
                    severity={alertSeverity}
                    onClose={() => { setShowAlert(false) }}
                  >
                    {cart.hasPriceChanged && <>The price of some products have changed<br /></>}
                    {cart.hasQuantityChanged && "The availability of some products have changed"}
                    {cart.hasUnavailable && "Please remove the unavailable products"}
                  </Alert>
                </Grid>
              )}
              <Grid
                container
                item
                md={8}
                spacing={1}
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
                  <CartCoupon promoCodeApplied={cart.promoCodeUsed} />
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

export const getServerSideProps: GetServerSideProps = async ({ locale, req, res }) => {
  const queryClient = new QueryClient()

  try {
    await queryClient.fetchQuery(['cart'], getCart({ req, res }))
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}


export default Cart;

Cart.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}