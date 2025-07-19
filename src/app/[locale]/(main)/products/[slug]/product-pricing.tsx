'use client';
import { AddButton } from '@/components/add-button';
import { AppImage } from '@/components/app-image';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import type { Product } from '@/types/product';
import { Card, CardContent } from '@mui/material';
import type { FC } from 'react';
import { ProductDiscount } from '../../../../../components/product-discount';

interface ProductPricingProps {
  product: Product;
}

export const ProductPricing: FC<ProductPricingProps> = (props) => {
  const { product } = props;
  const formatCurrency = useFormatCurrency();

  return (
    <Card>
      <AppImage
        layout="responsive"
        alt={product.title}
        height={9}
        src={product.cover.public_id}
        width={16}
      />
      <CardContent
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gap: 2,
        }}
      >
        <div className="relative flex aspect-square max-w-10">
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
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <p className="text-text-secondary line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            <p className="h5">{formatCurrency(product.price)}</p>
          </div>
          {product.originalPrice && (
            <ProductDiscount
              initialPrice={product.originalPrice}
              price={product.price}
            />
          )}
        </div>
        <AddButton
          size="large"
          productId={product._id}
        >
          Add to cart
        </AddButton>
      </CardContent>
    </Card>
  );
};
