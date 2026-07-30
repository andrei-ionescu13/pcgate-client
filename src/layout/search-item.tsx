import { AppImage } from '@/components/app-image';
import { useAmountFormatter } from '@/hooks/use-amount-formatter';
import { Link } from '@/i18n/navigation';
import { SteamIcon } from '@/icons/steam';
import type { Product } from '@/types/product';
import { cn } from '@/utils/cn';
import type { ComponentProps } from 'react';
import { ProductDiscount } from '../components/product-discount';

interface SearchItemProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  product: Product;
}

export const SearchItem = ({
  product,
  className,
  ...rest
}: SearchItemProps) => {
  const formatCurrency = useAmountFormatter();

  return (
    <Link
      className={cn(
        'bg-paper flex items-center pr-4 hover:bg-[rgba(0,0,0,0.16)]',
        className
      )}
      color="inherit"
      href={`/products/${product.slug}`}
      {...rest}
    >
      <div className="relative aspect-video w-full max-w-[160px]">
        <AppImage
          priority
          src={product.cover.public_id}
          alt={product.title}
          sizes="120px"
          fill
        />
      </div>
      <div className="ml-4 max-w-[300px] py-2">
        <p className="body2">{product.title}</p>
        <div className="mt-1 flex items-center">
          <SteamIcon />
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center">
        {product?.originalPrice && (
          <ProductDiscount
            initialPrice={product.originalPrice}
            price={product.price}
            variant="small"
          />
        )}
        <div className="ml-2">
          {product?.originalPrice && (
            <p className="text-text-secondary caption text-center line-through">
              {formatCurrency(product.originalPrice)}
            </p>
          )}
          <p className="subtitle1 text-center">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};
