import { Link } from '@/i18n/navigation';
import { type FC } from 'react';

interface LinkListProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export const LinkList: FC<LinkListProps> = (props) => {
  const { items } = props;

  return (
    <div className="flex flex-wrap">
      {items.map((item, index) => (
        <div key={item.label}>
          <Link
            href={item.href}
            color="textPrimary"
          >
            {item.label}
          </Link>
          {items.length > index + 1 && <>, &nbsp;</>}
        </div>
      ))}
    </div>
  );
};
