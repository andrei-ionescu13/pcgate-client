import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Slideshow } from '../components/slideshow';
import { CountdownProduct } from '../components/countdown-product';
import { BrowseSection } from '../components/browse-section';
import { ProductsSwipper } from '../components/products-swipper';
import { useFetch } from '../hooks/use-fetch';
import type { Product } from '../types/product';

export const Home: FC = () => {
  const [comingSoonProduct, comingSoonProductLoading] = useFetch<Product>('/products/highlighted/coming-soon');
  const [specialDealProduct, specialDealProductLoading] = useFetch<Product>('/products/highlighted/special-deal');
  const [bestSellerProducts, bestSellerProductsLoading] = useFetch<Product[]>('/products/best-sellers');

  return (
    <>
      <Helmet>
        <title>PCGATE</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          pt: 5
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={9}
              md={8}
              xs={12}
            >
              <Slideshow />
            </Grid>
            <Grid
              container
              item
              lg={3}
              md={4}
              spacing={2}
              sx={{ height: 'fit-content' }}
              xs={12}
            >
              <Grid
                item
                md={12}
                sm={6}
                xs={12}
              >
                <CountdownProduct
                  countdownDate={new Date(2021, 11, 17)}
                  label="Coming soon"
                  product={comingSoonProduct}
                  loading={comingSoonProductLoading}
                />
              </Grid>
              <Grid
                item
                md={12}
                sm={6}
                xs={12}
              >
                <CountdownProduct
                  countdownDate={new Date(2021, 11, 17)}
                  label="Special Deal"
                  product={specialDealProduct}
                  loading={specialDealProductLoading}
                />
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ pt: 8 }}>
            <Typography
              color="textPrimary"
              sx={{ mb: 3 }}
              variant="h4"
            >
              Top Sellers
            </Typography>
            <ProductsSwipper
              loading={bestSellerProductsLoading}
              products={bestSellerProducts}
            />
          </Box>
          <BrowseSection />
        </Container>
      </Box>
    </>
  );
};
