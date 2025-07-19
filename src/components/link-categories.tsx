import { Link } from '@mui/material';
import type { FC } from 'react';
import { LinkCategoriesButton } from './link-categories-button';

interface LinkCategoriesProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export const LinkCategories: FC<LinkCategoriesProps> = (props) => {
  const { items } = props;
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const categories = [
    {
      char: '0-9',
      items: (items || []).filter((item) => /^[0-9]/.test(item.label)),
    },
    ...alpha.map((char) => ({
      char,
      items: (items || []).filter((item) =>
        item.label.toLowerCase().startsWith(char.toLowerCase())
      ),
    })),
  ];

  const filteredCategories = categories.filter(
    (category) => !!category.items.length
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap">
        {filteredCategories.map((category) => (
          <LinkCategoriesButton
            key={category.char}
            category={category}
          />
        ))}
      </div>
      <div className="flex flex-col gap-10">
        {filteredCategories.map((category) => (
          <div
            key={category.char}
            className="flex gap-10"
            id={`category_${category.char}`}
          >
            <div className="min-w-20">
              <h4>{category.char}</h4>
            </div>
            <div className="grid flex-1 grid-cols-4">
              {category.items.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  color="textPrimary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
