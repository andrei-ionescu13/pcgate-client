import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { Layout } from "layout/layout";
import { NextPageWithLayout } from "pages/_app";
import { Genre as Feature } from "@/types/common";
import { appFetch } from "@/utils/app-fetch";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Product } from "@/types/product";
import { PaginationQuery } from "@/components/pagination-query";
import { SortByPopoverQuery } from "@/components/sort-by-popover-query";
import { ProductsGrid } from "@/components/products-grid";

const getDeveloper =
  (slug: string, config: Record<string, any> = {}) =>
  () =>
    appFetch<Feature>({
      url: `/features/${slug}`,
      ...config,
    });

const getProducts =
  (query: ParsedUrlQuery, config: Record<string, any> = {}) =>
  () =>
    appFetch<{ products: Product[]; count: number }>({
      url: `/products`,
      query,
      ...config,
    });

const Feature: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { slug, page, sortBy } = query as {
    slug: string;
    page?: string;
    sortBy: string;
  };
  const { data: feature } = useQuery(["feature", slug], getDeveloper(slug));
  const {
    data: productData,
    isRefetching,
    isPreviousData,
  } = useQuery(
    [
      "products",
      {
        features: feature?.name,
        page: page || null,
        sortBy: sortBy || null,
      },
    ],
    getProducts({ features: feature?.name, page, sortBy }),
    { keepPreviousData: true, enabled: !!feature }
  );

  if (!feature || !productData) return null;

  const { products, count } = productData;

  const items = [
    {
      value: "name",
      label: "Name",
    },
    {
      value: "price_asc",
      label: "Price low",
    },
    {
      value: "price_desc",
      label: "Price heigh",
    },
    {
      value: "discount",
      label: "Discount",
    },
    {
      value: "release_date",
      label: "Release Date",
    },
  ];

  return (
    <>
      <Head>
        <title>{feature.name} feature</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 5,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
            <Typography component="h1" variant="h2" color="textPrimary">
              {feature.name} feature
            </Typography>
            <Box sx={{ flex: 1 }} />
            <SortByPopoverQuery items={items} />
          </Box>
          <ProductsGrid
            products={products}
            isLoading={isRefetching && isPreviousData}
          />
          {Math.ceil(count / 36) !== 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 10,
              }}
            >
              <PaginationQuery
                size="large"
                count={Math.ceil(count / 36)}
                variant="outlined"
                color="primary"
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const { slug, page, sortBy } = query as {
    slug: string;
    page?: string;
    sortBy: string;
  };
  const queryClient = new QueryClient();

  try {
    const feature = await queryClient.fetchQuery(
      ["feature", slug],
      getDeveloper(slug, { req, res })
    );

    if (feature) {
      await queryClient.fetchQuery(
        [
          "products",
          {
            features: feature.name,
            page: page || null,
            sortBy: sortBy || null,
          },
        ],
        getProducts({ features: feature.name, page, sortBy }, { req, res })
      );
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      query,
    },
  };
};

export default Feature;

Feature.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
