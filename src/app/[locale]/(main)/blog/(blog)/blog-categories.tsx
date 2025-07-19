import { Link } from '@/i18n/navigation';
import { ArticleCategory } from '@/types/articles';
import { List, ListItem } from '@mui/material';
import type { FC } from 'react';

interface BlogCategoriesProps {
  categories: ArticleCategory[];
}

export const BlogCategories: FC<BlogCategoriesProps> = (props) => {
  const { categories } = props;

  const mappedCategories = [
    {
      label: 'All',
      value: '',
    },
    ...categories.map((category) => ({
      label: category.name,
      value: category.name,
    })),
  ];

  return (
    <div className="mt-8 mb-4">
      <h4>Categories</h4>
      <List>
        {mappedCategories.map((category) => (
          <ListItem
            disablePadding
            key={category.value}
          >
            <span className="mr-2">●</span>
            <Link
              href={
                category.value ? `/blog?category=${category.value}` : '/blog'
              }
              color="textPrimary"
            >
              {category.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
