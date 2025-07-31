'use client';
import { cn } from '@/utils/cn';
import type { FC } from 'react';
import { Card } from './card';
import { Divider } from './divider';
import { Skeleton } from './skeleton';
import { SkeletonText } from './skeleton-text';

interface ProductCardSkeletonProps {
  className?: string;
}

export const ProductCardSkeleton: FC<ProductCardSkeletonProps> = (props) => {
  const { className } = props;

  return (
    <Card
      className={cn(
        'bg-paper relative flex flex-col overflow-hidden',
        className
      )}
    >
      <div className="relative aspect-video">
        <Skeleton
          animation="pulse"
          variant="rectangular"
          className="h-full w-full"
        />
      </div>
      <div className="p2 flex min-h-[68px] items-start justify-between gap-2 p-2">
        <SkeletonText className="w-[120px]" />
      </div>
      <Divider />
      <div className="flex min-h-14 items-center" />
    </Card>
  );
};
