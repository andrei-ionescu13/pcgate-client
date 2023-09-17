import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Box, Container } from "@mui/material";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Layout } from "layout/layout";
import { NextPageWithLayout } from "pages/_app";

const Publisher: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Store</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 5,
        }}
      >
        <Container maxWidth="lg">Publisher</Container>
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

export default Publisher;

Publisher.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
