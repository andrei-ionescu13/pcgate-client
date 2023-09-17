import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { Layout } from "layout/layout";
import { NextPageWithLayout } from "pages/_app";
import { appFetch } from "@/utils/app-fetch";
import { LinkCategories } from "@/components/link-categories";
import { Publisher } from "@/types/publishers";

const listPublishers =
  (config: Record<string, any> = {}) =>
  () =>
    appFetch<Publisher[]>({ url: "/publishers", withAuth: true, ...config });

const Developers: NextPageWithLayout = () => {
  const { data: publishers } = useQuery(["publishers"], listPublishers());

  if (!publishers) return null;

  return (
    <>
      <Head>
        <title>Publishers</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 5,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            sx={{ mb: 5 }}
          >
            Publishers
          </Typography>
          <LinkCategories
            items={publishers.map((publisher) => ({
              label: publisher.name,
              href: `/publishers/${publisher.slug}`,
            }))}
          />
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
    await queryClient.fetchQuery(["publishers"], listPublishers({ req, res }));
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

export default Developers;

Developers.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
