import { Product } from '@/types/product';
import { cn } from '@/utils/cn';
import type { FC } from 'react';
import { DataOverlay } from './data-overlay';
import { ProductCard } from './product-card';
import { ProductCardLine } from './product-card-line';

interface ProductsGridProps {
  products: Product[];
  viewMode?: string;
  isLoading: boolean;
}

export const ProductsGrid: FC<ProductsGridProps> = (props) => {
  const { products, viewMode = 'grid', isLoading } = props;

  return (
    <DataOverlay
      isBlured={isLoading}
      className={cn(
        'grid gap-2',
        viewMode === 'grid'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
      )}
    >
      {products.map((product) =>
        viewMode === 'grid' ? (
          <ProductCard
            key={product._id}
            product={product}
          />
        ) : (
          <ProductCardLine
            key={product._id}
            product={product}
          />
        )
      )}
    </DataOverlay>
  );
};
