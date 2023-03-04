import Head from 'next/head';
import type { GetServerSideProps, NextPage } from "next";
import { Box } from '@mui/system';
import { Container, Divider, Grid, List, ListItem, Chip, Pagination, Tab, Tabs, Typography, useTheme, Card } from '@mui/material';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import type { Article } from '@/types/articles';
import { Link } from '@/components/link';
import { usePage } from '@/hooks/use-page';
import { appFetch } from '@/utils/app-fetch';
import { ArticleCard } from '@/components/blog/article-card';
import { SearchInput } from '../../components/search-input';
import { AddBoxSharp } from '@mui/icons-material';
import { AppImage } from '@/components/app-image';
import { format } from 'date-fns';
import { BlogCategories } from '@/components/blog/blog-categories';
import { BlogPopularArticles } from '@/components/blog/blog-popular-articles';
import { BlogPopularTags } from '@/components/blog/blog-popular-tags';
import { BlogSlideshow } from '@/components/blog/blog-slideshow';
import { Layout } from 'layout/layout';
import { NextPageWithLayout } from 'pages/_app';

export interface ArticleCategory {
  label: string;
  value?: string;
}

export interface ArticleTag {
  label: string;
  value: string;
}

const categories: ArticleCategory[] = [
  {
    label: 'All',
  },
  {
    label: 'News',
    value: 'news'
  },
  {
    label: 'Games',
    value: 'games'
  },
  {
    label: 'Review',
    value: 'reviews'
  },
]


const tags: ArticleTag[] = [
  {
    label: 'Pirates',
    value: 'pirates'
  },
  {
    label: 'Monsters',
    value: 'monsters'
  },
  {
    label: 'Sonic',
    value: 'sonic'
  },
]


interface BlogProps {
  articles: Article[];
}

interface GetArticlesData {
  articles: Article[];
  count: number;
}

const getArticles = (query: ParsedUrlQuery, config: Record<string, any> = {}) => () => appFetch<GetArticlesData>({
  url: '/articles',
  query,
  ...config
})

const Blog: NextPageWithLayout<BlogProps> = () => {
  const { query } = useRouter();
  const { data } = useQuery(['articles', query], getArticles(query));
  const [page, handlePageChange] = usePage();

  if (!data) return null;

  const { articles, count } = data;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePageChange(event, value - 1);
  };

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 5
        }}
      >
        <Container maxWidth="lg">
          <Box mb={10}>
            <BlogSlideshow articles={[...articles, ...articles]} />
          </Box>
          <Grid
            container
            spacing={3}
          >
            <Grid
              container
              spacing={3}
              item
              xs={9}
              alignContent="start"
            >
              {[...articles, ...articles, ...articles].map((article) => (
                <Grid
                  item
                  xs={6}
                  key={article._id}
                >
                  <ArticleCard article={article} />
                </Grid>
              ))}
            </Grid>
            <Grid
              spacing={3}
              item
              xs={3}
            >
              <SearchInput
                sx={{ py: 1.5 }}
                onChange={() => { }}
                value=""
              />
              <BlogCategories categories={categories} />
              <BlogPopularArticles articles={[...articles, ...articles, ...articles]} />
              <BlogPopularTags tags={tags} />
            </Grid>
          </Grid>
          {page > 0 && (
            <Box
              sx={{
                mt: 30,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {!!articles.length ? (
                <Pagination
                  shape="rounded"
                  color="primary"
                  page={page + 1}
                  count={Math.ceil(count / 12)}
                  onChange={handleChange}
                />
              ) : (
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  There are no results
                </Typography>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query, req, res }) => {
  const queryClient = new QueryClient()

  try {
    await queryClient.fetchQuery(['articles', query], getArticles(query, { req, res }))
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}

export default Blog;

Blog.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
