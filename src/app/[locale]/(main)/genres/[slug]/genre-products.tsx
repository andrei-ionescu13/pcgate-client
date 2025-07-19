'use client';
import { PaginationParam } from '@/components/pagination-param';
import { ProductList } from '@/components/product-list';
import { useSearchProducts } from 'app/[locale]/(main)/api-calls-hooks';
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';

interface GenreProductsProps {
  genre: string;
  initialData: any;
}

export const GenreProducts: FC<GenreProductsProps> = (props) => {
  const { genre, initialData } = props;
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
  const { error, data, isRefetching, isPlaceholderData } = useSearchProducts({
    ...query,
    genres: genre,
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
