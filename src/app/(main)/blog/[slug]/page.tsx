import Head from "next/head";
import type { NextPage, GetServerSideProps } from "next";
import { Box } from "@mui/system";
import { Container, Typography, Grid, Divider } from "@mui/material";
import type { Article as ArticleI } from "@/types/articles";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { AppImage } from "@/components/app-image";
import { Share } from "@/components/share";
import { ArticleLabel } from "@/components/blog/article-label";
import { appFetch } from "@/utils/app-fetch";
import { markdownToHtml } from "@/utils/markdown-to-html";
import { Markdown } from "@/components/markdown";
import { MainLayout } from "layout/layout";
import { NextPageWithLayout } from "temp-pages/pages/_app";

const getArticle =
  (slug: string) =>
    appFetch<{ article: ArticleI }>({
      url: `/articles/${slug}`,
      withAuth: true,
    });

interface ArticleProps {
  content: string;
}

export default async function Article({ params }) {
  const { slug } = params;
  const { article } = await getArticle(slug);
  const { title, cover, meta, category } = article;
  const createdAt = new Date(article.createdAt);
  const content = await markdownToHtml(article.markdown);

  const href = typeof window !== "undefined" && window.location.href;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(", ")} />
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "> span": {
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  },
                }}
              >
                <AppImage
                  priority={true}
                  src={cover.public_id}
                  alt={title}
                  quality={100}
                  width={16}
                  height={9}
                  sizes="
                  (min-width: 1200px) 1200px,
                  100vw"
                />
                <Box
                  sx={{
                    backgroundColor: "background.paper",
                    p: 2,
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                  }}
                >
                  {/* change this */}
                  {/* <ArticleLabel category={category} /> */}
                  <Box
                    sx={{
                      justifyContent: "space-between",
                      gridAutoFlow: "column",
                      display: "grid",
                      alignItems: "center",
                      gap: 5,
                      my: 2,
                    }}
                  >
                    <Typography color="textPrimary" component="h1" variant="h2">
                      {title}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#02223C",
                        borderRadius: 1,
                        color: "#F6F7F8",
                        display: "grid",
                        p: 1.2,
                        placeContent: "center",
                      }}
                    >
                      <Typography textAlign="center" variant="h5" component="p">
                        {format(createdAt, "dd")}
                      </Typography>
                      <Typography textAlign="center" variant="body2">
                        {`${format(createdAt, "MMM")} ${format(
                          createdAt,
                          "yyyy"
                        )}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Markdown content={content} />
                  <Divider sx={{ my: 1.5 }} />
                  <Box>
                    <Typography
                      color="textPrimary"
                      variant="subtitle1"
                      sx={{
                        fontSize: 18,
                        mb: 1,
                      }}
                    >
                      Share this post
                    </Typography>
                    {href && <Share url={href} />}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
