'use client';
import { Card, Divider, Skeleton } from '@mui/material';
import type { FC } from 'react';

interface ProductCardSkeletonProps {}

export const ProductCardSkeleton: FC<ProductCardSkeletonProps> = (props) => {
  return (
    <Card
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        textDecoration: 'none',
      }}
    >
      <div className="relative aspect-video">
        <Skeleton
          variant="rectangular"
          sx={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <div className="p2 flex min-h-[62px] items-start justify-between gap-2">
        <Skeleton width={120} />
      </div>
      <Divider />
      <div className="flex min-h-14 items-center" />
    </Card>
  );
};
