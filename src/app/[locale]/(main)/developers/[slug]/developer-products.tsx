'use client';
import { PaginationParam } from '@/components/pagination-param';
import { ProductList } from '@/components/product-list';
import { useSearchProducts } from 'app/[locale]/(main)/api-calls-hooks';
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';

interface GenreProductsProps {
  developer: string;
  initialData: any;
}

export const DeveloperProducts: FC<GenreProductsProps> = (props) => {
  const { developer, initialData } = props;
  const searchParams = useSearchParams();
  const query: any = {};
  for (const [key, value] of searchParams.entries()) {
    if (!!query[key]) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }

  const { page, sortBy } = query;
  const { data, isRefetching, isPlaceholderData } = useSearchProducts({
    developers: developer,
    page,
    sortBy,
  });

  const { products, count } = data || initialData;

  return (
    <div>
      <ProductList
        products={products}
        isLoading={isRefetching && isPlaceholderData}
      />
      {Math.ceil(count / 36) > 1 && (
        <div className="mt-20 flex justify-center">
          <PaginationParam count={Math.ceil(count / 36)} />
        </div>
      )}
    </div>
  );
};
