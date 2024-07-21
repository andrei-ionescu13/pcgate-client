import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { NextPageWithLayout } from "temp-pages/pages/_app";
import { appFetch } from "@/utils/app-fetch";
import { LinkCategories } from "@/components/link-categories";
import { Publisher } from "@/types/publishers";

const listPublishers =
  () =>
    appFetch<Publisher[]>({ url: "/publishers", withAuth: true, });

export default async function Publishers() {
  const publishers = await listPublishers();

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
