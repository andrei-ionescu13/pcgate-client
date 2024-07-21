import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { MainLayout } from "layout/layout";
import { appFetch } from "@/utils/app-fetch";
import { Developer } from "@/types/developer";
import { LinkCategories } from "@/components/link-categories";

const listFeatures =
  (config: Record<string, any> = {}) =>
    appFetch<Developer[]>({ url: "/features", withAuth: true, ...config });

export default async function Features() {
  const features = await listFeatures();

  if (!features) return null;

  return (
    <>
      <Head>
        <title>Features</title>
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
            Features
          </Typography>
          <LinkCategories
            items={features.map((developer) => ({
              label: developer.name,
              href: `/features/${developer.slug}`,
            }))}
          />
        </Container>
      </Box>
    </>
  );
};
