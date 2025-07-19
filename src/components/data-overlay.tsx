import { cn } from '@/utils/cn';
import type { FC } from 'react';

export interface DataOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isBlured: boolean;
}

export const DataOverlay: FC<DataOverlayProps> = (props) => {
  const { children, className, isBlured } = props;

  return (
    <div
      className={cn(
        'relative',
        isBlured ? 'blur-sm saturate-100' : '',
        className
      )}
    >
      {isBlured && <div className="absolute inset-0 z-50" />}
      {children}
    </div>
  );
};
