import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ProductCard } from '../components/product-card';
import { useStoreSelector } from '../hooks/use-store-selector';

export const Wishlist: FC = () => {
  const wishlistedProducts = useStoreSelector((state) => state.wishlist.products);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 5
        }}
      >
        <Container maxWidth="lg">
          <Typography
            color="textPrimary"
            sx={{ mb: 6 }}
            variant="h3"
          >
            Wishlist
          </Typography>
          <Grid
            container
            spacing={3}
          >
            {wishlistedProducts.map((product) => (
              <Grid
                item
                key={product._id}
                lg={3}
                md={4}
                sm={6}
                xs={12}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
