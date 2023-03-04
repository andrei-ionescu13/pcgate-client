import type { FC } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { Link } from '@/components/link';
import type { ArticleCategory } from 'pages/blog';
import { useRouter } from 'next/router';

interface BlogCategoriesProps {
  categories: ArticleCategory[];
}

export const BlogCategories: FC<BlogCategoriesProps> = (props) => {
  const { categories } = props;
  const { query } = useRouter()

  return (
    <Box
      mt={4}
      mb={2}
    >
      <Typography
        color="textPrimary"
        variant="h4"
      >
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            disablePadding
            key={category.value}
          >
            <Box
              component="span"
              sx={{
                color: (theme) => theme.palette.primary.main,
                mr: 1
              }}
            >
              ●
            </Box>
            <Link
              href={category.value ? `/blog?category=${category.value}` : '/blog'}
              color="textPrimary"
              variant="body2"
              sx={{
                color: (category.value && query.category === category.value) ? 'primary.main' : undefined
              }}
            >
              {category.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}