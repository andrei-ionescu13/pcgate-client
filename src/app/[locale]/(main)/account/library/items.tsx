'use client';

import { DataOverlay } from '@/components/data-overlay';
import { LibraryProduct } from '@/components/library-product';
import { PaginationParam } from '@/components/pagination-param';
import type { FC } from 'react';
import { SearchLibraryData } from './api';
import { useSearchLibary } from './api-hooks';

interface ItemsProps {
  initialData: SearchLibraryData;
}

export const Items: FC<ItemsProps> = (props) => {
  const { initialData } = props;
  const { data, isRefetching, isPlaceholderData } = useSearchLibary();
  const { items, count } = data || initialData;

  return (
    <div>
      <DataOverlay
        className="grid gap-4"
        isBlured={isRefetching && isPlaceholderData}
      >
        {items.map((item) => (
          <LibraryProduct
            product={item.product}
            productKey={item.key}
            key={item._id}
          />
        ))}
      </DataOverlay>
      {count > 2 && (
        <div className="mt-10 flex content-center">
          <PaginationParam count={Math.ceil(count / 2)} />
        </div>
      )}
    </div>
  );
};
