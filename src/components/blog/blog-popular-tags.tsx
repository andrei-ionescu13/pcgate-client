import type { FC } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import type { ArticleTag } from 'pages/blog';
import { Link } from '@/components/link';

interface BlogPopularTagsProps {
  tags: ArticleTag[]
}

export const BlogPopularTags: FC<BlogPopularTagsProps> = (props) => {
  const { tags } = props;

  return (
    <Box>
      <Typography
        color="textPrimary"
        variant="h4"
        mb={1}
      >
        Popular Tags
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5
        }}
      >
        {tags.map((tag) => (
          <Chip
            component={Link}
            href={`/blog?tag=${tag.value}`}
            key={tag.value}
            label={tag.label}
            onClick={() => { }}
            size="small"
            underline="none"
          />
        ))}
      </Box>
    </Box>
  )
}