import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ProductDetails } from '../components/product/product-details';
import { ProductInfo } from '../components/product/product-info';
import { ProductMediaSlideshow } from '../components/product/product-media-slideshow';
import { ProductPricing } from '../components/product/product-pricing';
import { ProductRequirements } from '../components/product/product-requirements';
import { ProductReviews } from '../components/product/product-reviews';
import { AtomSpinner } from 'components/spinner';
import { useGetProduct } from 'api/products';

interface Slide {
  slug: string;
  type: 'video' | 'image';
  url: string;
}

export const Product: FC = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useGetProduct(slug);

  const getContent = () => {
    if (isLoading) return (
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          flex: 1
        }}
      >
        <AtomSpinner />
      </Box>
    );


    if (product) {

      const slides: Slide[] = [
        ...product.video.map((video) => ({
          type: 'video',
          url: `https://www.youtube.com/watch?v=${video}`
        })),
        // @ts-ignore
        ...product.img.map((img) => ({
          type: 'image',
          slug: img.slug
        }))
      ];

      return (
        <Box
          sx={{
            pt: 5
          }}
        >
          <Container maxWidth="lg">
            <Typography
              color="textPrimary"
              sx={{ mb: 4 }}
              variant="h4"
            >
              {product.name}
            </Typography>
            <Grid
              container
              spacing={4}
              sx={{ pb: 5 }}
            >
              <Grid
                container
                item
                lg={8}
                md={7}
                spacing={2}
                sx={{ height: 'fit-content' }}
                xs={12}
              >
                <Grid
                  item
                  sx={{
                    display: {
                      md: 'none'
                    }
                  }}
                  xs={12}
                >
                  <ProductPricing product={product} />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <ProductMediaSlideshow slides={slides} />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Box
                    sx={{
                      color: 'text.primary',
                      my: 3,
                      '& img': {
                        maxWidth: '100%'
                      }
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: product.desc }} />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <ProductRequirements requirements={product.platform_specs} />
                </Grid>
              </Grid>
              <Grid
                container
                item
                lg={4}
                md={5}
                spacing={2}
                sx={{ height: 'fit-content' }}
                xs={12}
              >
                <Grid
                  item
                  sx={{
                    display: {
                      md: 'block',
                      xs: 'none'
                    }
                  }}
                  xs={12}
                >
                  <ProductPricing product={product} />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <ProductInfo drm={product.drm_string} />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <ProductDetails product={product} />
                </Grid>
              </Grid>
            </Grid>
          </Container>
          {/* {product.data.reviews.length ? (
            <ProductReviews
              reviews={product.data.reviews}
              reviewsSummary={product.data.reviewsSummary}
            />
          ) : (
            null
          )} */}
          <ProductReviews
            productId={product._id}
            reviews={product.reviews}
            reviewsSummary={product.reviewsSummary}
          />
        </Box>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {product?.name}
        </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}
      >
        {getContent()}
      </Box>
    </>
  );
};
