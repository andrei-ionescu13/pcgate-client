import { AppImage } from "@/components/app-image";
import { appFetch } from "@/utils/app-fetch";
import { Box, Card, CircularProgress, Container, Grid } from "@mui/material";
import { NextPage } from "next";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Typography from "@mui/material/Typography";
import { ProductCard } from "@/components/product-card";
import { useCountdown } from "@/hooks/use-countdown";
import { Fragment, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Product } from "@/types/product";
import type { Meta } from "@/types/common";
import { MainLayout } from "layout/layout";
import { NextPageWithLayout } from "temp-pages/pages/_app";

interface DealProductsPage {
  products: Product[];
  hasNext: boolean;
}

interface DealI {
  _id: string;
  cover: {
    public_id: string;
    width: number;
    height: number;
    _id: string;
  };
  title: string;
  description: string;
  slug: string;
  endDate: string;
  meta: Meta;
  hasExpired?: boolean;
}

const getDeal =
  (slug: string, config: Record<string, any> = {}) =>
    () =>
      appFetch<DealI>({
        url: `/collections/${slug}`,
        ...config,
      });

const getDealProducts =
  (slug: string, config: Record<string, any> = {}) =>
    ({ pageParam = 1 }) =>
      appFetch<DealProductsPage>({
        url: `/collections/${slug}/products`,
        query: { page: pageParam },
        ...config,
      });

interface DealProps {
  deal: DealI;
  dealProducts: DealProductsPage;
}

const Deal: NextPageWithLayout<DealProps> = (props) => {
  const { deal: dealProp, dealProducts: dealProductsProp } = props;
  const { query } = useRouter();
  const { slug } = query as { slug: string };
  const { ref, inView } = useInView();
  const { data: deal } = useQuery(["deal", slug], getDeal(slug), {
    initialData: dealProp,
  });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["deal-products", slug], getDealProducts(slug), {
    initialData: () => ({
      pages: [dealProductsProp],
      pageParams: [null],
    }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : undefined,
  });
  const timeDiff = useCountdown(new Date(deal.hasExpired ? deal.endDate : 0));

  useEffect(() => {
    inView && hasNextPage && fetchNextPage();
  }, [inView, hasNextPage]);

  if (!data) return null;

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        position: "relative",
        overflow: "hidden",
        py: 5,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zindex: 0,
          height: "100vh",
          filter: deal.hasExpired ? "grayscale(80%)" : undefined,
        }}
      >
        <AppImage
          layout="fill"
          priority
          src={deal.cover.public_id}
          alt=""
          objectFit="cover"
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0) 50%, #161C24 100%), linear-gradient(270deg, rgba(0, 0, 0, 0) 50%, #161C24 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #161C24 100%)",
          }}
        />
      </Box>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography color="primary" variant="h1">
              {deal.title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {deal.description}
            </Typography>
            {!deal.hasExpired && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 8,
                }}
              >
                {timeDiff.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Card
                      sx={{
                        background: (theme) => theme.palette.secondary.main,
                        minWidth: 68,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Typography color="textPrimary" variant="h3">
                        {item.value}
                      </Typography>
                    </Card>
                    <Typography color="textPrimary" variant="subtitle2">
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            {deal.hasExpired && (
              <Typography color="textPrimary" variant="h5" component="p" mt={3}>
                This offer has expired
              </Typography>
            )}
          </Box>
          {!deal.hasExpired && (
            <Grid container spacing={3} mt={10}>
              {data.pages.map((group, i) => {
                return (
                  <Fragment key={i}>
                    {group.products.map((product) => (
                      <Grid item xs={12} key={product._id} sm={6} md={4} lg={3}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                  </Fragment>
                );
              })}
            </Grid>
          )}
        </Box>
        <Box
          ref={ref}
          sx={{
            display: "grid",
            placeItems: "center",
          }}
        >
          {isFetchingNextPage && <CircularProgress />}
        </Box>
      </Container>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
  req,
  res,
}) => {
  const queryClient = new QueryClient();
  const { slug } = query as { slug: string };
  const f = getDealProducts(slug, { req, res });
  let deal;
  let dealProducts;

  try {
    deal = await queryClient.fetchQuery({
      queryKey: ["deal", slug],
      queryFn: getDeal(slug, { req, res }),
    });
    dealProducts = await queryClient.fetchQuery({
      queryKey: ["deal-products", slug],
      queryFn: () => f({ pageParam: 1 }),
    });
    // await queryClient.fetchQuery(['deal', slug], getDeal(slug, { req, res }))
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      deal,
      dealProducts,
      ...(await serverSideTranslations(locale, ["common", "footer"])),
    },
  };
};

export default Deal;

Deal.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
