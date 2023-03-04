import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Clock as ClockIcon } from '@/icons/clock';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import { Link } from '@/components/link';
import type { Article, ArticleCategory } from '@/types/articles';
import { AppImage } from '@/components/app-image';

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

const ArticleCardRoot = styled(Card)({
  position: 'relative',
  '.image-container': {
    transition: 'transform 350ms',
  },
  '&:hover': {
    '.image-container': {
      transform: 'scale(1.25) translateZ(0px)'
    }
  }

});

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: FC<ArticleCardProps> = (props) => {
  const { article } = props;
  const { cover, title, slug, createdAt, category } = article;

  return (
    <ArticleCardRoot elevation={0}>
      <Box className="image-container">
        <AppImage
          layout="responsive"
          priority
          src={cover.public_id}
          alt={title}
          width={16}
          height={9}
          sizes="
        (min-width: 1200px) 400px,
        (min-width: 900px) 33vw,
        (min-width: 600px) 50vw"
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 90%)'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start'
        }}
      >
        <Box>
          <Typography
            color="text.disabled"
            variant="subtitle3"
            component="p"
          >
            {format(new Date(createdAt), 'dd.MM.yyyy')}
            {" "}
            ●
            {" "}
            <Link
              color="inherit"
              variant="inherit"
              href={`/blog?category=${category}`}
              sx={{ textTransform: 'capitalize' }}
            >
              {category}
            </Link>
          </Typography>
        </Box>
        <Link
          color="textPrimary"
          variant="h4"
          href={`/blog/${slug}`}
        >
          {title}
        </Link>
      </Box>
    </ArticleCardRoot >
  )
}
