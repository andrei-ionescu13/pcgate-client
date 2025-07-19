import { AppImage } from '@/components/app-image';
import { Link } from '@/i18n/navigation';
import type { Article } from '@/types/articles';
import { Card } from '@mui/material';
import { format } from 'date-fns';
import type { FC } from 'react';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: FC<ArticleCardProps> = (props) => {
  const { article } = props;
  const { cover, title, slug, createdAt, category } = article;

  return (
    <Card
      sx={{ position: 'relative' }}
      elevation={0}
      className="group"
    >
      <div className="relative aspect-video transition-all duration-300 group-hover:scale-125">
        <AppImage
          fill
          priority
          src={cover.public_id}
          alt={title}
          sizes="
        (min-width: 1200px) 400px,
        (min-width: 900px) 33vw,
        (min-width: 600px) 50vw"
        />
      </div>
      <div className="bg-article absolute inset-0" />
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
        <div>
          <p className="subtitle3 text-text-disabled">
            {format(new Date(createdAt), 'dd.MM.yyyy')} ●{' '}
            <Link
              className="capitalize"
              href={`/blog?category=${category.slug}`}
            >
              {category.name}
            </Link>
          </p>
        </div>
        <Link
          color="textPrimary"
          href={`/blog/${slug}`}
        >
          {title}
        </Link>
      </div>
    </Card>
  );
};
