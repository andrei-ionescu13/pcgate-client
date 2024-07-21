import type { FC } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { Link } from '@/components/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { ArticleCategory } from '@/types/articles';

interface BlogCategoriesProps {
  categories: ArticleCategory[];
}

export const BlogCategories: FC<BlogCategoriesProps> = (props) => {
  const { categories } = props;

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
                color: 'text.primary',
                mr: 1
              }}
            >
              ●
            </Box>
            <Link
              href={category.value ? `/blog?category=${category.value}` : '/blog'}
              color="textPrimary"
              variant="body2"
            >
              {category.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}