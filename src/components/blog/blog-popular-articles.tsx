import type { FC } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { Link } from '@/components/link';
import { AppImage } from '@/components/app-image';
import { format } from 'date-fns';
import type { Article } from '@/types/articles';

interface BlogPopularArticlesProps {
  articles: Article[];
}

export const BlogPopularArticles: FC<BlogPopularArticlesProps> = (props) => {
  const { articles } = props;

  return (
    <Box>
      <Typography
        color="textPrimary"
        variant="h4"
      >
        Popular articles
      </Typography>
      <List>
        {articles.map((article) => (
          <ListItem
            key={article._id}
            disableGutters
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: 1.5,
                'img': {
                  borderRadius: 1
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '100px',
                }}
              >
                <AppImage
                  layout="responsive"
                  priority
                  src={article.cover.public_id}
                  alt={article.title}
                  sizes="120px"
                  height={9}
                  width={16}
                />
              </Box>
              <Box>
                <Link
                  href={`/blog/${article.slug}`}
                  color="textPrimary"
                  variant="subtitle2"
                >
                  {article.title}
                </Link>
                <Box>
                  <Typography
                    color="text.disabled"
                    variant="caption"
                    component="p"
                  >
                    {format(new Date(article.createdAt), 'dd.MM.yyyy')}
                    {" "}
                    ●
                    {" "}
                    <Link
                      color="inherit"
                      variant="inherit"
                      href={`/blog?category=${article.category}`}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {article.category}
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}