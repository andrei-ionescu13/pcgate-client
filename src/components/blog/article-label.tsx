import type { FC } from 'react'
import type { ArticleCategory } from '@/types/articles';
import { Link } from '@/components/link';
import { Box, Typography } from '@mui/material';

interface ArticleLabelProps {
  category: ArticleCategory;
}

const categories: Record<ArticleCategory, { color: string; label: string }> = {
  games: {
    color: '#394E7F',
    label: 'Games'
  },
  reviews: {
    color: '#FF0035',
    label: 'Reviews'
  },
  news: {
    color: '#00E05E',
    label: 'News'
  },
}

export const ArticleLabel: FC<ArticleLabelProps> = (props) => {
  const { category } = props;

  return (
    <Link
      href={`/blog?category=${category}`}
      underline="none"
      sx={{
        backgroundColor: categories[category].color,
        color: '#fff',
        px: 0.75,
        py: 0.25,
        borderRadius: 1,
        display: 'inline-flex'
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: '#FFF' }}
      >
        {categories[category].label}
      </Typography>
    </Link>
  )
}