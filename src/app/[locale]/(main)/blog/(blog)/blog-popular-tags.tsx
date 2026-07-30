import { ArticleTag } from '@/types/articles';
import { Chip } from '@mui/material';

interface BlogPopularTagsProps {
  tags: ArticleTag[];
}

export const BlogPopularTags = ({ tags }: BlogPopularTagsProps) => {
  return (
    <div>
      <h4 className="mb-2">Popular Tags</h4>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Chip
            key={tag.name}
            label={tag.name}
            size="small"
          />
        ))}
      </div>
    </div>
  );
};
