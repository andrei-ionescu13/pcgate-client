import type { Product } from '@/types/product';
import { cn } from '@/utils/cn';
import { DataOverlay } from './data-overlay';
import { ProductCard } from './product-card';
import { ProductCardLine } from './product-card-line';

interface ProductsGridProps {
  products: Product[];
  viewMode?: string;
  isLoading: boolean;
}

export const ProductsGrid = ({
  products,
  viewMode = 'grid',
}: ProductsGridProps) => {
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
