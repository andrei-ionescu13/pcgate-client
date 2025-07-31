import { cn } from '@/utils/cn';
import type { FC, ReactNode } from 'react';

interface PropertyItemProps {
  align?: 'horizontal' | 'vertical';
  content: string | ReactNode;
  label: string;
}

export const PropertyItem: FC<PropertyItemProps> = (props) => {
  const { label, content, align = 'horizontal' } = props;

  return (
    <li
      className={cn(
        'flex py-1 sm:py-2',
        align === 'horizontal'
          ? 'flex-col items-start sm:flex-row sm:items-center'
          : 'flex-col items-start'
      )}
    >
      <p
        className={cn(
          'text-text-secondary body2',
          align === 'horizontal' ? 'sm:min-w-[120px]' : 'min-w-auto'
        )}
      >
        {label}
      </p>
      <div>{typeof content === 'string' ? <p>{content}</p> : content}</div>
    </li>
  );
};
