import { AppImage } from '@/components/app-image';
import { Container } from '@/components/container';
import { Divider } from '@/components/divider';
import { Markdown } from '@/components/markdown';
import { Share } from '@/components/share';
import { locales } from '@/i18n/routing';
import { markdownToHtml } from '@/utils/markdown-to-html';
import { format } from 'date-fns';
import Head from 'next/head';
import { listArticles } from '../(blog)/api';
import { getArticle } from './api';
import { ArticleLabel } from './article-label';

interface ArticleProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await listArticles();

  return locales.flatMap((locale) =>
    articles.map(({ slug }) => ({
      locale,
      slug,
    }))
  );
}

const Article = async ({ params }: ArticleProps) => {
  const { slug, locale } = await params;
  const { article } = await getArticle(slug);
  const { title, cover, meta, category } = article;
  const createdAt = new Date(article.createdAt);
  const content = await markdownToHtml(article.markdown);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta
          name="description"
          content={meta.description}
        />
        <meta
          name="keywords"
          content={meta.keywords.join(', ')}
        />
      </Head>
      <div className="py-6">
        <Container maxWidth="lg">
          <div className="flex flex-col overflow-hidden rounded-lg">
            <div className="relative flex aspect-video">
              <AppImage
                src={cover.public_id}
                alt={title}
                fill
              />
            </div>
            <div className="bg-paper p-4">
              {category && <ArticleLabel category={category} />}
              <div className="mb-4 flex items-center justify-between gap-10">
                <h1 className="h2">{title}</h1>
                <div className="bg-primary grid place-items-center rounded-lg p-2">
                  <p className="h5 text-center">{format(createdAt, 'dd')}</p>
                  <p className="body2 text-center">
                    {`${format(createdAt, 'MMM')} ${format(createdAt, 'yyyy')}`}
                  </p>
                </div>
              </div>
              <Markdown content={content} />
              <Divider className="my-3" />
              <div>
                <p className="subtitle1">Share this post</p>
                <Share
                  url={`${process.env.NEXT_PUBLIC_API_PATH}/${locale}/blog/${slug}`}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Article;
