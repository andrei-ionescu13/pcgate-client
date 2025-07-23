import { AppImage } from '@/components/app-image';
import { Container } from '@/components/container';
import { Divider } from '@/components/divider';
import { Markdown } from '@/components/markdown';
import { Share } from '@/components/share';
import { markdownToHtml } from '@/utils/markdown-to-html';
import { format } from 'date-fns';
import Head from 'next/head';
import { getArticle } from './api';
import { ArticleLabel } from './article-label';

interface ArticleProps {
  params: {
    slug: string;
  };
}

const Article = async (props: ArticleProps) => {
  const { params } = props;
  const { slug } = params;
  const { article } = await getArticle(slug);
  const { title, cover, meta, category } = article;
  const createdAt = new Date(article.createdAt);
  const content = await markdownToHtml(article.markdown);
  const href = typeof window !== 'undefined' && window.location.href;

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
                priority={true}
                src={cover.public_id}
                alt={title}
                quality={100}
                fill
              />
            </div>
            <div className="bg-paper p-4">
              {/* change this */}
              <ArticleLabel category={category} />
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
                {href && <Share url={href} />}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Article;
