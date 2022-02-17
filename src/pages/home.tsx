import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Slideshow } from '../components/slideshow';
import { CountdownProduct } from '../components/countdown-product';
import { BrowseSection } from '../components/browse-section';
import { ProductsSwipper } from '../components/products-swipper';
import { useGetBestSellers, useGetComingSoong, useGetSpecialDeal } from '../api/products';

export const Home: FC = () => {
  const { isLoading: bestSellersLoading, data: bestSellers } = useGetBestSellers();
  const { isLoading: coomingSoonLoading, data: coomingSoon } = useGetComingSoong();
  const { isLoading: specialDealLoading, data: specialDeal } = useGetSpecialDeal();

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
                  product={coomingSoon}
                  loading={coomingSoonLoading}
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
                  product={specialDeal}
                  loading={specialDealLoading}
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
              loading={bestSellersLoading}
              products={bestSellers}
            />
          </Box>
          <BrowseSection />
        </Container>
      </Box>
    </>
  );
};
