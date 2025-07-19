'use client';

import { ProductCard } from '@/components/product-card';
import { useInView } from '@/hooks/use-in-view';
import { Product } from '@/types/product';
import { CircularProgress } from '@mui/material';
import { Fragment, useEffect, type FC } from 'react';
import { useDealProducts } from './api-hooks';

interface CollectionProductsProps {
  initialProducts: {
    products: Product[];
    hasNext: boolean;
  };
}

export const CollectionProducts: FC<CollectionProductsProps> = (props) => {
  const { initialProducts } = props;
  const { ref, inView } = useInView<HTMLDivElement>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDealProducts(initialProducts);

  useEffect(() => {
    inView && hasNextPage && fetchNextPage();
  }, [inView, hasNextPage]);

  return (
    <div>
      <div className="mt-20 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.products.map((product) => (
                <ProductCard
                  product={product}
                  key={product._id}
                />
              ))}
            </Fragment>
          );
        })}
      </div>
      <div
        className="grid place-items-center"
        ref={ref}
      >
        {isFetchingNextPage && <CircularProgress />}
      </div>
    </div>
  );
};
