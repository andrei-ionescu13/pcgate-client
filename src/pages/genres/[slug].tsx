import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { Layout } from "layout/layout";
import { NextPageWithLayout } from "pages/_app";
import { Genre } from "@/types/common";
import { appFetch } from "@/utils/app-fetch";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Product } from "@/types/product";
import { PaginationQuery } from "@/components/pagination-query";
import { ProductCard } from "@/components/product-card";
import { SortByPopoverQuery } from "@/components/sort-by-popover-query";
import { ProductsGrid } from "@/components/products-grid";

const getGenre =
  (slug: string, config: Record<string, any> = {}) =>
  () =>
    appFetch<Genre>({
      url: `/genres/${slug}`,
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

const Genre: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { slug, page, sortBy } = query as {
    slug: string;
    page?: string;
    sortBy: string;
  };
  const { data: genre } = useQuery(["genre", slug], getGenre(slug));
  const {
    data: productData,
    isRefetching,
    isPreviousData,
  } = useQuery(
    [
      "products",
      { genre: genre?.name, page: page || null, sortBy: sortBy || null },
    ],
    getProducts({ genre: genre?.name, page, sortBy }),
    { keepPreviousData: true, enabled: !!genre }
  );

  if (!genre || !productData) return null;

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
        <title>{genre.name} genre</title>
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
              {genre.name} genre
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
    const genre = await queryClient.fetchQuery(
      ["genre", slug],
      getGenre(slug, { req, res })
    );

    const res2 = await queryClient.fetchQuery(
      [
        "products",
        { genre: genre.name, page: page || null, sortBy: sortBy || null },
      ],
      getProducts({ genre: genre.name, page, sortBy }, { req, res })
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

export default Genre;

Genre.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
