import { Container } from '@/components/container';
import Head from 'next/head';
import { getArticles, listCategories, listTags } from './api';
import { ArticleCard } from './article-card';
import { BlogCategories } from './blog-categories';
import { BlogPopularArticles } from './blog-popular-articles';
import { BlogPopularTags } from './blog-popular-tags';
import { BlogSlideshow } from './blog-slideshow';

interface BlogProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
  }>;
}

const Blog = async (props: BlogProps) => {
  const searchParams = await props.searchParams;
  const articlesData = await getArticles(searchParams);
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
          <div className="mb-20">
            <BlogSlideshow articles={articles} />
          </div>
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
              <BlogPopularArticles articles={articles} />
              <BlogPopularTags tags={tags} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Blog;
