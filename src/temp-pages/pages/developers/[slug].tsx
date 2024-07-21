import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { MainLayout } from "layout/layout";
import { NextPageWithLayout } from "temp-pages/pages/_app";
import { Genre as Developer } from "@/types/common";
import { appFetch } from "@/utils/app-fetch";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Product } from "@/types/product";
import { PaginationQuery } from "@/components/pagination-query";
import { ProductCard } from "@/components/product-card";
import { SortByPopoverQuery } from "@/components/sort-by-popover-query";
import { ProductsGrid } from "@/components/products-grid";

const getDeveloper =
  (slug: string, config: Record<string, any> = {}) =>
    () =>
      appFetch<Developer>({
        url: `/developers/${slug}`,
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

const Developer: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { slug, page, sortBy } = query as {
    slug: string;
    page?: string;
    sortBy: string;
  };
  const { data: developer } = useQuery(["developer", slug], getDeveloper(slug));
  const {
    data: productData,
    isRefetching,
    isPreviousData,
  } = useQuery(
    [
      "products",
      {
        developer: developer?.name,
        page: page || null,
        sortBy: sortBy || null,
      },
    ],
    getProducts({ developer: developer?.name, page, sortBy }),
    { keepPreviousData: true, enabled: !!developer }
  );

  if (!developer || !productData) return null;

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
        <title>{developer.name} developer</title>
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
              {developer.name} developer
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
    const developer = await queryClient.fetchQuery(
      ["developer", slug],
      getDeveloper(slug, { req, res })
    );

    const res2 = await queryClient.fetchQuery(
      [
        "products",
        {
          developer: developer.name,
          page: page || null,
          sortBy: sortBy || null,
        },
      ],
      getProducts({ developer: developer.name, page, sortBy }, { req, res })
    );
    console.log(res2);
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

export default Developer;

Developer.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
