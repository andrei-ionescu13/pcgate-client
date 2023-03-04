import type { FC } from 'react';
import { Box, Grid, Typography, Card, } from '@mui/material';
import type { Article } from '@/types/articles';
import { Link } from '@/components/link';
import { AppImage } from '@/components/app-image';
import { format } from 'date-fns';

interface BlogSlideshowArticleProps {
  article: Article;
}

export const BlogSlideshowArticle: FC<BlogSlideshowArticleProps> = (props) => {
  const { article } = props;

  return (
    <Card sx={{ borderRadius: 0 }}>
      <Grid
        container
      >
        <Grid
          item
          xs={8}
        >
          <Box>
            <AppImage
              layout="responsive"
              priority
              src={article.cover.public_id}
              alt={article.title}
              width={16}
              height={9}
              sizes="
                (min-width: 1200px) 400px,
                (min-width: 900px) 33vw,
                (min-width: 600px) 50vw
              "
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <Box p={3}>
            <Box>
              <Typography
                color="text.disabled"
                variant="subtitle3"
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
            <Link
              color="textPrimary"
              variant="h4"
              href={`/blog/${article.slug}`}
              sx={{ mt: 0.5, mb: 2, display: 'flex' }}
            >
              {article.title}
            </Link>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nihil dicta iusto sit fugiat id quaerat excepturi, fuga veritatis ipsam dolores cupiditate fugit repudiandae nostrum minima dolorum itaque tenetur sunt.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}