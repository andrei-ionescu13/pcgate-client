import type { GetServerSideProps, NextPage } from 'next';
import { Box, Container, Grid, styled, Typography } from '@mui/material';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Product, ProductReview } from '@/types/product';
import { remark } from 'remark';
import html from 'remark-html'
import { appFetch } from '@/utils/app-fetch';
import { ProductMedia } from '@/components/product/product-media';
import type { ProductMediaSlide, ProductMediaSlideImage, ProductMediaSlideVideo } from '@/components/product/product-media';
import { ProductRating } from '@/components/product/product-rating/product-rating';
import { ProductPricing } from '@/components/product/product-pricing';
import { ProductDetails } from '@/components/product/product-details';
import { Markdown } from '@/components/markdown';
import { ProductRequirements } from '@/components/product/product-requirements';
import { Layout } from 'layout/layout';
import { NextPageWithLayout } from 'pages/_app';

const markdownToHtml = async (markdown: string): Promise<string> => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

const getProduct = (slug: string, config: Record<string, any> = {}) => () => appFetch<Product>({
  url: `/products/${slug}`,
  ...config
});

interface ProductProps {
  content: string
  minimumRequirements: string;
  recommendedRequirements: string;
}

const Product: NextPageWithLayout<ProductProps> = (props) => {
  const { content, minimumRequirements, recommendedRequirements } = props;
  const { query } = useRouter();
  const { slug } = query as { slug: string };
  const { data: product } = useQuery(['product', slug], getProduct(slug));
  if (!product) return null;

  const imageSlides: ProductMediaSlideImage[] = product.images.map((image) => ({
    type: 'image',
    public_id: image.public_id
  }))

  const videoSlides: ProductMediaSlideVideo[] = product.videos.map((video) => ({
    type: 'video',
    url: video
  }))

  const slides: ProductMediaSlide[] = [...videoSlides, ...imageSlides];


  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          py: 5
        }}
      >
        <Container maxWidth="lg">
          <Typography
            color="textPrimary"
            sx={{ mb: 4 }}
            variant="h4"
          >
            {product.title}
          </Typography>
          <Grid
            container
            spacing={2}
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
                <ProductMedia slides={slides} />
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
                  <Markdown content={content} />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <ProductRequirements
                  min={minimumRequirements}
                  recommended={recommendedRequirements}
                />
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
                <ProductDetails product={product} />
              </Grid>
            </Grid>
          </Grid>
          <ProductRating product={product} />

        </Container>
        {/* {product.data.reviews.length ? (
            <ProductReviews
              reviews={product.data.reviews}
              reviewsSummary={product.data.reviewsSummary}
            />
          ) : (
            null
          )} */}
        {/* <ProductReviews
          productId={product._id}
          reviews={product.reviews}
          reviewsSummary={product.reviewsSummary}
        /> */}
      </Box>
    </Box>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ locale, query, req, res }) => {
  const queryClient = new QueryClient()
  const { slug } = query as { slug: string };
  let content, minimumRequirements, recommendedRequirements;

  try {
    // await queryClient.fetchQuery(['product-reviews', slug], listProductReviews(slug, { req, res }))
    const product = await queryClient.fetchQuery(['product', slug], getProduct(slug, { req, res }))
    content = await markdownToHtml(product.markdown);
    minimumRequirements = await markdownToHtml(product.minimumRequirements)
    recommendedRequirements = await markdownToHtml(product.recommendedRequirements)
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      content,
      minimumRequirements,
      recommendedRequirements,
      ...await serverSideTranslations(locale, ['common', 'footer']),
    }
  }
}

export default Product;

Product.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}