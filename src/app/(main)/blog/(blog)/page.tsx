import Head from "next/head";
import { Box } from "@mui/system";
import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Chip,
  Pagination,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Card,
} from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { ParsedUrlQuery } from "querystring";
import type { Article } from "@/types/articles";
import { usePage } from "@/hooks/use-page";
import { appFetch } from "@/utils/app-fetch";
import { ArticleCard } from "@/components/blog/article-card";
import { SearchInput } from "../../../components/search-input";
import { BlogCategories } from "@/components/blog/blog-categories";
import { BlogPopularArticles } from "@/components/blog/blog-popular-articles";
import { BlogPopularTags } from "@/components/blog/blog-popular-tags";
import { BlogSlideshow } from "@/components/blog/blog-slideshow";

export interface ArticleCategory {
  label: string;
  value?: string;
}

export interface ArticleTag {
  label: string;
  value: string;
}

interface BlogProps {
  articles: Article[];
}

interface GetArticlesData {
  articles: Article[];
  count: number;
}

const getArticles =
  (query: ParsedUrlQuery, config: Record<string, any> = {}) =>
    appFetch<GetArticlesData>({
      url: "/articles",
      query,
      ...config,
    });

const listCategories =
  (config: Record<string, any> = {}) =>
    appFetch<{ categories: string[] }>({
      url: "/articles/categories",
      ...config,
    });

const listTags =
  (config: Record<string, any> = {}) =>
    appFetch<{ tags: string[] }>({
      url: "/articles/popular-tags",
      ...config,
    });


// const useSearchArticles = () => {
//   const query: any = {};
//   const searchParams = useSearchParams();

//   for (const [key, value] of searchParams.entries()) {
//     query[key] = value;
//   }

//   return useQuery({
//     queryKey: ["articles", query],
//     queryFn: getArticles(query)
//   });
// }

// const useListCategories = () => useQuery({
//   queryKey: ["articles", "categories"],
//   queryFn: listCategories()
// })

// const useListTags = () => useQuery({
//   queryKey: ["articles", "popular-tags"],
//   queryFn: listTags()
// })

export default async function Blog({ searchParams }) {
  const articlesData = await getArticles(searchParams);
  const { categories } = await listCategories()
  const { tags } = await listTags()

  // const [page, handlePageChange] = usePage();


  if (!articlesData || !categories || !tags) return null;

  const { articles, count } = articlesData;

  const mappedCategories: ArticleCategory[] = [
    {
      label: "All",
    },
    ...categories.map((category) => ({
      value: category,
      label: category,
    })),
  ];

  const mappedTags: ArticleTag[] = [
    ...tags.map((category) => ({
      value: category,
      label: category,
    })),
  ];

  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   handlePageChange(event, value - 1);
  // };

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 5,
        }}
      >
        <Container maxWidth="lg">
          <Box mb={10}>
            <BlogSlideshow articles={[...articles, ...articles]} />
          </Box>
          <Grid container spacing={3}>
            <Grid container spacing={3} item xs={9} alignContent="start">
              {articles.map((article) => (
                <Grid item xs={6} key={article._id}>
                  <ArticleCard article={article} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={3}>
              {/* <SearchInput sx={{ py: 1.5 }} onChange={() => { }} value="" /> */}
              <BlogCategories categories={mappedCategories} />
              <BlogPopularArticles
                articles={[...articles, ...articles, ...articles]}
              />
              <BlogPopularTags tags={mappedTags} />
            </Grid>
          </Grid>
          {/* change this */}
          {/* {page > 0 && (
            <Box
              sx={{
                mt: 30,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!!articles.length ? (
                <Pagination
                  shape="rounded"
                  color="primary"
                  page={page + 1}
                  count={Math.ceil(count / 12)}
                // onChange={handleChange}
                />
              ) : (
                <Typography color="textPrimary" variant="body1">
                  There are no results
                </Typography>
              )}
            </Box>
          )} */}
        </Container>
      </Box>
    </>
  );
};
