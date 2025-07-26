'use client';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/types/product';
import type { FC } from 'react';
import { WishlistButton } from '../layout/wishlist-button';
import { AddButton } from './add-button';
import { AppImage } from './app-image';
import { Card } from './card';
import { Divider } from './divider';
import { ProductDiscount } from './product-discount';

interface ProductCardProps {
  loading?: boolean;
  product: Product;
  refreshOnRemoveFromWislist?: boolean;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
  const formatCurrency = useFormatCurrency();
  const { product, refreshOnRemoveFromWislist } = props;

  return (
    <Card className="relative flex h-full flex-col">
      <div className="absolute top-4 right-4 z-50">
        <WishlistButton
          refreshOnRemove={refreshOnRemoveFromWislist}
          productId={product._id}
        />
      </div>
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-video">
          <AppImage
            fill
            priority
            src={product.cover.public_id}
            alt={product.title}
            sizes="
                (min-width: 1200px) 400px,
                (min-width: 900px) 33vw,
                (min-width: 600px) 50vw
                "
          />
        </div>
      </Link>
      <div className="flex min-h-[68px] flex-1 flex-col items-start justify-between p-2 sm:flex-row md:gap-4">
        <Link
          color="inherit"
          href={`/products/${product.slug}`}
          className="body2 line-clamp-2"
        >
          {product.title}
        </Link>
        <div className="flex items-center">
          {product.originalPrice && (
            <ProductDiscount
              className="mr-2"
              variant="small"
              initialPrice={product.originalPrice}
              price={product.price}
            />
          )}
          <div className="grid place-items-center">
            {product.originalPrice && (
              <p className="text-shadow-text-secondary caption line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            <p className="subtitle2">{formatCurrency(product.price)}</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex items-center p-2">
        <div className="relative flex aspect-square w-full max-w-10">
          <AppImage
            priority
            src={product.platform.logo.public_id}
            alt={product.platform.name}
            sizes="
                (min-width: 1200px) 400px,
                (min-width: 900px) 33vw,
                (min-width: 600px) 50vw"
            fill
          />
        </div>
        <div className="flex-1" />
        <AddButton productId={product._id}>Add</AddButton>
      </div>
    </Card>
  );
};
