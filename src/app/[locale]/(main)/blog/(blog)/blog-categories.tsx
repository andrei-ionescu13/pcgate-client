import { Link } from '@/i18n/navigation';
import { ArticleCategory } from '@/types/articles';
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
      <ul className="py-1">
        {mappedCategories.map((category) => (
          <li key={category.value}>
            <span className="mr-2">●</span>
            <Link
              href={
                category.value ? `/blog?category=${category.value}` : '/blog'
              }
              color="textPrimary"
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
