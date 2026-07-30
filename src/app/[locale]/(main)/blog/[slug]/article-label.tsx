import { Link } from '@/i18n/navigation';
import type { ArticleCategory } from '@/types/articles';

interface ArticleLabelProps {
  category: ArticleCategory;
}

const cateogryColorsMap: Record<string, { color: string; label: string }> = {
  Games: {
    color: '#394E7F',
    label: 'Games',
  },
  Reviews: {
    color: '#FF0035',
    label: 'Reviews',
  },
  News: {
    color: '#00E05E',
    label: 'News',
  },
};

export const ArticleLabel = ({ category }: ArticleLabelProps) => {
  return (
    <Link
      href={`/blog?category=${category.slug}`}
      className="subtitle2 inline-flex rounded-lg px-1.5 py-0.5 text-white"
      style={{ backgroundColor: cateogryColorsMap[category.name]?.color }}
    >
      {category.name}
    </Link>
  );
};
