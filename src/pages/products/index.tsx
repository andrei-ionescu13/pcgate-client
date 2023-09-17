import { useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { Box, Container, Typography, Button, Drawer } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { appFetch } from "@/utils/app-fetch";
import { ParsedUrlQuery } from "querystring";
import { Product } from "@/types/product";
import { AdjustmentsHorizontal as AdjustmentsHorizontalIcon } from "@/icons/adjustments-horizontal";
import { SortByPopoverQuery } from "@/components/sort-by-popover-query";
import { PaginationQuery } from "@/components/pagination-query";
import { ProductCard } from "@/components/product-card";
import { ProductCardLine } from "@/components/product-card-line";
import { ViewModeButton } from "@/components/view-mode-button";
import { ProductsFilters } from "@/components/products/products-filters";
import { ProductsFilterChip } from "@/components/products/products-filter-chip";
import type { Genre, Platform } from "@/types/common";
import { Layout } from "layout/layout";
import { NextPageWithLayout } from "pages/_app";
import { Publisher } from "@/types/publishers";
import { Feature } from "@/types/feature";
import { Developer } from "@/types/developer";
import { OperatingSystem } from "@/types/operating-system";

const getProducts =
  (query: ParsedUrlQuery, config: Record<string, any> = {}) =>
  () =>
    appFetch<{ products: Product[]; count: number }>({
      url: `/products`,
      query,
      ...config,
    });

const listGenres =
  (config: Record<string, any> = {}) =>
  () =>
    appFetch<Genre[]>({ url: "/genres", withAuth: true, ...config });
const listPublishers =
  (config: Record<string, any> = {}) =>
  () =>
    appFetch<Publisher[]>({ url: "/publishers", withAuth: true, ...config });
const listPlatforms =
  (config: Record<string, any> = {}) =>
  () =>
    appFetch<Platform[]>({ url: "/platforms", withAuth: true, ...config });
const listDevelopers =
  (config: Record<string, any> = {}) =>
  () =>
    appFetch<Developer[]>({ url: "/developers", withAuth: true, ...config });
const listFeatures =
  (config: Record<string, any> = {}) =>
  () =>
    appFetch<Feature[]>({ url: "/features", withAuth: true, ...config });

const listOperatingSystems =
  (config: Record<string, any> = {}) =>
  () =>
    appFetch<OperatingSystem[]>({
      url: "/operating-systems",
      withAuth: true,
      ...config,
    });

export interface OptionI {
  label: string;
  value: string | number;
}

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

const Products: NextPageWithLayout = () => {
  const { query } = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { error, data, isRefetching, isPreviousData } = useQuery(
    ["products", query],
    getProducts(query),
    { keepPreviousData: true }
  );
  const developersQuery = useQuery(["developers"], listDevelopers());
  const featuresQuery = useQuery(["features"], listFeatures());
  const genresQuery = useQuery(["genres"], listGenres());
  const operatingSystemsQuery = useQuery(
    ["oerating-systems"],
    listOperatingSystems()
  );
  const platformsQuery = useQuery(["platforms"], listPlatforms());
  const publishersQuery = useQuery(["publishers"], listPublishers());

  const genres = genresQuery.data || [];
  const platforms = platformsQuery.data || [];
  const publishers = publishersQuery.data || [];
  const developers = developersQuery.data || [];
  const features = featuresQuery.data || [];
  const operatingSystems = operatingSystemsQuery.data || [];

  const mappedQuery: Array<[string, string]> = [];
  const chipFor = [
    "price_min",
    "price_max",
    "os",
    "platforms",
    "genres",
    "publishers",
    "developers",
    "features",
  ];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  console.log(operatingSystems);
  const handleViewModeChange = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  Object.keys(query)
    .filter((key) => chipFor.includes(key))
    .forEach((key) => {
      if (typeof query[key] === "string") {
        mappedQuery.push([key, query[key] as string]);
      } else if (Array.isArray(query[key])) {
        (query?.[key] as string[])?.forEach((x: string) =>
          mappedQuery.push([key, x])
        );
      }
    });

  if (!data || !genres || !platforms) return null;
  const { products, count } = data;

  return (
    <>
      <Drawer
        sx={{
          marginTop: "110px",
          width: 320,
          flexShrink: 0,
          position: "relative",
          "& .MuiDrawer-paper": {
            marginTop: "110px",
            height: "calc(100% - 110px)",
            width: 320,
            boxSizing: "border-box",
            p: 2,
          },
          "& .MuiBackdrop-root": {
            marginTop: "110px",
          },
        }}
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <ProductsFilters
          platforms={platforms}
          genres={genres}
          publishers={publishers}
          developers={developers}
          features={features}
          operatingSystems={operatingSystems}
        />
      </Drawer>
      <Head>
        <title>Store</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 5,
        }}
      >
        <Container maxWidth="lg" ref={containerRef}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                md: "220px 1fr",
                xs: " 1fr",
              },
              columnGap: 5,
              rowGap: 2,
            }}
          >
            <Box />
            <Box
              sx={{
                display: "grid",
                width: "100%",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: 1,
                }}
              >
                <Button
                  color="white"
                  variant="outlined"
                  onClick={handleOpenDrawer}
                  sx={{
                    display: {
                      md: "none",
                      xs: "inline-flex",
                    },
                  }}
                >
                  <Typography color="textPrimary" variant="body2" mr={1}>
                    Filters
                  </Typography>
                  <AdjustmentsHorizontalIcon />
                </Button>
                <Box sx={{ flex: 1 }} />
                <Box
                  sx={{
                    display: {
                      md: "block",
                      xs: "none",
                    },
                  }}
                >
                  <ViewModeButton
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                  />
                </Box>
                <SortByPopoverQuery items={items} />
              </Box>
              <Box
                sx={{
                  display: {
                    md: "none",
                    xs: "flex",
                  },
                  justifyContent: "flex-end",
                }}
              >
                <ViewModeButton
                  viewMode={viewMode}
                  onViewModeChange={handleViewModeChange}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {mappedQuery.map(([key, value]) => (
                  <ProductsFilterChip
                    key={`${key}-${value}`}
                    field={key}
                    value={value}
                  />
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: {
                  md: "block",
                  xs: "none",
                },
              }}
            >
              <ProductsFilters
                platforms={platforms}
                genres={genres}
                publishers={publishers}
                developers={developers}
                features={features}
                operatingSystems={operatingSystems}
              />
            </Box>
            <Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: () =>
                    viewMode === "grid"
                      ? {
                          lg: "repeat(3, 1fr)",
                          sm: "repeat(2, 1fr)",
                          xs: "1fr",
                        }
                      : "1fr",
                  gap: 2,
                  filter:
                    isRefetching && isPreviousData
                      ? "blur(4px) saturate(100%)"
                      : undefined,
                  position: "relative",
                }}
              >
                {isRefetching && isPreviousData && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 999,
                    }}
                  />
                )}
                {products.map((product) =>
                  viewMode === "grid" ? (
                    <ProductCard key={product._id} product={product} />
                  ) : (
                    <ProductCardLine key={product._id} product={product} />
                  )
                )}
              </Box>
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
            </Box>
          </Box>
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
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.fetchQuery(
        ["products", query],
        getProducts(query, { req, res })
      ),
      queryClient.fetchQuery(["developers"], listDevelopers({ req, res })),
      queryClient.fetchQuery(["features"], listFeatures({ req, res })),
      queryClient.fetchQuery(["genres"], listGenres({ req, res })),
      queryClient.fetchQuery(
        ["oerating-systems"],
        listOperatingSystems({ req, res })
      ),
      queryClient.fetchQuery(["platforms"], listPlatforms({ req, res })),
      queryClient.fetchQuery(["publishers"], listPublishers({ req, res })),
    ]);
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

export default Products;

Products.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
