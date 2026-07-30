import { Container } from '@/components/container';
import { NoData } from '@/components/no-data';
import Head from 'next/head';
import { listCategories, listTags, searchArticles } from './api';
import { ArticleCard } from './article-card';
import { BlogCategories } from './blog-categories';
import { BlogPopularArticles } from './blog-popular-articles';
import { BlogSlideshow } from './blog-slideshow';

interface BlogProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
  }>;
}

const Blog = async (props: BlogProps) => {
  const searchParams = await props.searchParams;
  const articlesData = await searchArticles(searchParams);
  const categories = await listCategories();
  const tags = await listTags();

  if (!articlesData || !categories || !tags) return null;

  const { articles } = articlesData;

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">
          {!articles.length ? (
            <NoData className="bg-paper" />
          ) : (
            <>
              {!!articles.length && (
                <div className="mb-20">
                  <BlogSlideshow articles={articles} />
                </div>
              )}
              <div className="grid gap-6 md:grid-cols-[9fr_3fr]">
                <div className="grid h-fit gap-6 sm:grid-cols-2">
                  {articles.map((article) => (
                    <ArticleCard
                      article={article}
                      key={article._id}
                    />
                  ))}
                </div>
                <div>
                  <BlogCategories categories={categories} />
                  {!!articles.length && (
                    <BlogPopularArticles articles={articles} />
                  )}
                </div>
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default Blog;
