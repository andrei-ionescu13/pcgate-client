import { cn } from '@/utils/cn';

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress = ({ value, className }: ProgressProps) => {
  return (
    <div
      className={cn(
        'bg-primary/35 relative h-[5px] w-full overflow-hidden rounded-md',
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
