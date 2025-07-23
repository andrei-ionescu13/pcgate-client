import { cn } from '@/utils/cn';
import type { FC } from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress: FC<ProgressProps> = (props) => {
  const { value, className } = props;
  return (
    <div
      className={cn(
        'bg-primary-dark relative h-[5px] w-full overflow-hidden rounded-md',
        className
      )}
    >
      <div
        className="bg-primary top-0 bottom-0 left-0 h-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
