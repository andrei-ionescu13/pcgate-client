import { cn } from '@/utils/cn';

interface NoDataProps {
  className?: string;
}

export const NoData = ({ className }: NoDataProps) => {
  return (
    <div
      className={cn(
        'bg-default flex justify-center rounded-md py-8',
        className
      )}
    >
      No data has been found
    </div>
  );
};
