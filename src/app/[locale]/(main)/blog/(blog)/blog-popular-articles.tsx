import { AppImage } from '@/components/app-image';
import { Link } from '@/i18n/navigation';
import type { Article } from '@/types/articles';
import { List, ListItem } from '@mui/material';
import { format } from 'date-fns';
import type { FC } from 'react';

interface BlogPopularArticlesProps {
  articles: Article[];
}

export const BlogPopularArticles: FC<BlogPopularArticlesProps> = (props) => {
  const { articles } = props;

  return (
    <div>
      <h4>Popular articles</h4>
      <List>
        {articles.map((article) => (
          <ListItem
            key={article._id}
            disableGutters
          >
            <div className="flex w-full gap-3">
              <div className="relative aspect-video min-w-32 overflow-hidden rounded-lg">
                <AppImage
                  src={article.cover.public_id}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <Link
                  href={`/blog/${article.slug}`}
                  className="subtitle2"
                >
                  {article.title}
                </Link>
                <div>
                  <p className="caption text-text-disabled">
                    {format(new Date(article.createdAt), 'dd.MM.yyyy')} ●{' '}
                    <Link
                      href={`/blog?category=${article.category.slug}`}
                      className="capitalize"
                    >
                      {article.category.name}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
