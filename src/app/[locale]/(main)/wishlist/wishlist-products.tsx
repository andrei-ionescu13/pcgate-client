'use client';

import { ProductCard } from '@/components/product-card';
import { useWishlist } from '@/store/wishlist';
import type { Product } from '@/types/product';

interface WishlistProductsProps {
  products: Product[];
}

export const WishlistProducts = ({
  products: initialProducts,
}: WishlistProductsProps) => {
  const wishlistProducts = useWishlist((state) => state.products);
  const products = initialProducts.filter((product) =>
    wishlistProducts.includes(product._id)
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product._id}
        />
      ))}
    </div>
  );
};
