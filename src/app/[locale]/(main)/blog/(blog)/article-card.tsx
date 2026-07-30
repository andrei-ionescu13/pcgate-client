import { AppImage } from '@/components/app-image';
import { Card } from '@/components/card';
import { Link } from '@/i18n/navigation';
import type { Article } from '@/types/articles';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const { cover, title, slug, createdAt, category } = article;

  return (
    <Card className="group relative">
      <div className="relative aspect-video transition-all duration-300 group-hover:scale-125">
        <AppImage
          fill
          src={cover.public_id}
          alt={title}
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
