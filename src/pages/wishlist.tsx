import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import { Box, Container, Grid, Typography } from "@mui/material";
import { appFetch } from "@/utils/app-fetch";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useStoreSelector } from "@/store/use-store-selector";
import { getSession } from "@/utils/get-session";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { Layout } from "layout/layout";
import { NextPageWithLayout } from "./_app";

const getWishlist =
  (config: Record<string, any> = {}) =>
  () =>
    appFetch<Product[]>({
      url: "/auth/wishlist",
      withAuth: true,
      ...config,
    });

const Wishlist: NextPageWithLayout = () => {
  const { data: wishlistedProducts } = useQuery(["wishlist"], getWishlist());
  const wishlistProductsStore = useStoreSelector(
    (state) => state.wishlist.products
  );

  if (!wishlistedProducts) return null;

  return (
    <>
      <Head>
        <title>Wishlist</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 5,
        }}
      >
        <Container maxWidth="lg">
          <Typography color="textPrimary" sx={{ mb: 6 }} variant="h3">
            Wishlist
          </Typography>
          <Grid container spacing={3}>
            {wishlistedProducts
              .filter((product) => wishlistProductsStore.includes(product._id))
              .map((product) => (
                <Grid item key={product._id} lg={3} md={4} sm={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
  res,
}) => {
  const queryClient = new QueryClient();
  const decoded = await getSession(req, res);

  if (!decoded) {
    return {
      redirect: {
        destination: `/${locale}/login`,
        statusCode: 303,
      },
    };
  }
  try {
    await queryClient.fetchQuery(["wishlist"], getWishlist({ req, res }));
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Wishlist;

Wishlist.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
