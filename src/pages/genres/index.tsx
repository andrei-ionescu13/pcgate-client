import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { Layout } from "layout/layout";
import { NextPageWithLayout } from "pages/_app";
import { appFetch } from "@/utils/app-fetch";
import { Genre } from "@/types/common";
import { LinkCategories } from "@/components/link-categories";

const listGenres =
  (config: Record<string, any> = {}) =>
  () =>
    appFetch<Genre[]>({ url: "/genres", withAuth: true, ...config });

const Genres: NextPageWithLayout = () => {
  const { data: genres } = useQuery(["genres"], listGenres());

  if (!genres) return null;

  return (
    <>
      <Head>
        <title>Genres</title>
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
            Genres
          </Typography>
          <LinkCategories
            items={genres.map((genre) => ({
              label: genre.name,
              href: `/genres/${genre.slug}`,
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
    await queryClient.fetchQuery(["genres"], listGenres({ req, res }));
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

export default Genres;

Genres.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
