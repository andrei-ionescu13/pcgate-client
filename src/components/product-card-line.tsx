import { useFormatCurrency } from '@/hooks/use-format-currency';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/types/product';
import type { FC } from 'react';
import { AddButton } from './add-button';
import { AppImage } from './app-image';
import { Card } from './card';
import { ProductDiscount } from './product-discount';

interface ProductCardLineProps {
  loading?: boolean;
  product: Product;
  variant?: 'line' | 'card';
}

export const ProductCardLine: FC<ProductCardLineProps> = (props) => {
  const { product } = props;
  const formatCurrency = useFormatCurrency();

  return (
    <Card className="relative flex overflow-hidden p-2">
      <div className="w-2/6 max-w-56 min-w-24">
        <Link
          href={`/products/${product.slug}`}
          className="block overflow-hidden rounded-lg"
        >
          <AppImage
            layout="responsive"
            width={16}
            height={9}
            priority
            src={product.cover.public_id}
            alt={product.title}
            sizes="
                (min-width: 1200px) 400px,
                (min-width: 900px) 33vw,
                (min-width: 600px) 50vw"
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-2 md:flex-row md:items-center md:gap-0">
        <Link
          color="inherit"
          href={`/products/${product.slug}`}
          className="body1"
        >
          {product.title}
        </Link>
        <div className="flex-1" />
        <div className="flex items-center">
          <div className="flex flex-1 items-center">
            {product.originalPrice && (
              <ProductDiscount
                className="mt-2"
                variant="small"
                initialPrice={product.originalPrice}
                price={product.price}
              />
            )}
            <div className="flex w-full items-center">
              <div className="grid place-items-center md:min-w-16">
                {product.originalPrice && (
                  <p className="text-text-secondary caption line-through">
                    {formatCurrency(product.originalPrice)}
                  </p>
                )}
                <p className="subtitle1">{formatCurrency(product.price)}</p>
              </div>
              <div className="flex-1" />
              <AddButton
                productId={product._id}
                className="ml-2"
              >
                Add
              </AddButton>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
