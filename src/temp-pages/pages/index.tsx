import type { NextPage, GetServerSideProps } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import {
  Box,
  Container,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Slideshow } from "@/components/slideshow";
import { CountdownProduct } from "@/components/countdown-product";
import { BrowseSection } from "@/components/browse-section";
import { ProductsSwipper } from "@/components/products-swipper";
import { appFetch } from "utils/app-fetch";
import { useAuth } from "@/contexts/auth-context";
import { useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Product } from "@/types/product";
import { Asset, Meta } from "@/types/common";
import { MainLayout } from "layout/layout";
import { NextPageWithLayout } from "./_app";

// const getBestSellers = () => appFetch('products/best-sellers');
// const getComingSoon = () => appFetch('products/highlighted/coming-soon');
// const getSpecialDeal = () => appFetch('products/highlighted/special-deal');

interface Collection {
  meta: Meta;
  _id: string;
  cover: Asset;
  title: string;
  description: string;
  slug: string;
  endDate: null | string;
  products: string[];
  isDeal: boolean;
}

const listCollections =
  (config: Record<string, any> = {}) =>
    () =>
      appFetch<Collection[]>({
        url: "/collections",
        withAuth: true,
        ...config,
      });

const listNewReleases =
  (config: Record<string, any> = {}) =>
    () =>
      appFetch<Product[]>({
        url: "/products/new-releases",
        withAuth: true,
        ...config,
      });

const Home: NextPageWithLayout = () => {
  const { data: collections } = useQuery(["collections"], listCollections());
  const { data: newReleases } = useQuery(["new-releases"], listNewReleases());
  const onMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  if (!collections || !newReleases) return null;

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        pt: {
          md: 5,
        },
        pb: 5,
      }}
    >
      <Container maxWidth="lg" disableGutters={onMobile}>
        <Box
          sx={{
            borderRadius: {
              md: 1,
              xs: undefined,
            },
            overflow: "hidden",
            width: {
              md: "75%",
              xs: "100%",
            },
          }}
        >
          <Slideshow items={collections} />
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* <Grid
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
              md={6}
              xs={12}
            >
              <CountdownProduct
                countdownDate={new Date(2021, 11, 17)}
                label="Coming soon"
                product={coomingSoon}
              />
            </Grid>
            <Grid
              item
              md={12}
              md={6}
              xs={12}
            >
              <CountdownProduct
                countdownDate={new Date(2021, 11, 17)}
                label="Special Deal"
                product={specialDeal}
              />
            </Grid>
          </Grid> */}
        </Grid>
        <Box sx={{ pt: 8 }}>
          <Typography color="textPrimary" sx={{ mb: 3 }} variant="h4">
            Top Sellers
          </Typography>
          <ProductsSwipper products={newReleases} />
        </Box>
        {/* <BrowseSection /> */}
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

  try {
    await queryClient.fetchQuery(
      ["collections"],
      listCollections({ req, res })
    );
    await queryClient.fetchQuery(
      ["new-releases"],
      listNewReleases({ req, res })
    );
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ["common", "footer"])),
    },
  };
};

export default Home;

Home.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
