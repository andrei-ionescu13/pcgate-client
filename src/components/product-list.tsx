import { ProductCard } from '@/components/product-card';
import { ProductCardLine } from '@/components/product-card-line';
import type { Product } from '@/types/product';
import { cn } from '@/utils/cn';
import { DataOverlay } from './data-overlay';

interface ProductListProps {
  products: Product[];
  viewMode?: string;
  isLoading?: boolean;
}

export const ProductList = ({
  products,
  viewMode = 'grid',
}: ProductListProps) => {
  return (
    <DataOverlay>
      <div
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
      </div>
    </DataOverlay>
  );
};
