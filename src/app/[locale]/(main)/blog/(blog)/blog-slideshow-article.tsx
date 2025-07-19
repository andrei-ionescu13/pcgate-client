import { AppImage } from '@/components/app-image';
import { Link } from '@/i18n/navigation';
import type { Article } from '@/types/articles';
import { Card } from '@mui/material';
import { format } from 'date-fns';
import type { FC } from 'react';

interface BlogSlideshowArticleProps {
  article: Article;
}

export const BlogSlideshowArticle: FC<BlogSlideshowArticleProps> = (props) => {
  const { article } = props;

  return (
    <Card sx={{ borderRadius: 0 }}>
      <div className="grid md:grid-cols-[8fr_4fr]">
        <div className="relative flex aspect-video">
          <AppImage
            priority
            src={article.cover.public_id}
            alt={article.title}
            fill
          />
        </div>
        <div className="p-6">
          <div>
            <p className="subtitle3 text-text-disabled">
              {format(new Date(article.createdAt), 'dd.MM.yyyy')} ●{' '}
              <Link
                color="inherit"
                href={`/blog?category=${article.category.slug}`}
              >
                {article.category.name}
              </Link>
            </p>
          </div>
          <Link
            href={`/blog/${article.slug}`}
            className="mt-1 mb-2 inline-flex"
          >
            {article.title}
          </Link>
          <p className="body2 text-text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            nihil dicta iusto sit fugiat id quaerat excepturi, fuga veritatis
            ipsam dolores cupiditate fugit repudiandae nostrum minima dolorum
            itaque tenetur sunt.
          </p>
        </div>
      </div>
    </Card>
  );
};
