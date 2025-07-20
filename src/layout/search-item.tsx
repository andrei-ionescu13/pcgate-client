import { AppImage } from '@/components/app-image';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import { Link } from '@/i18n/navigation';
import { Steam as SteamIcon } from '@/icons/steam';
import { Product } from '@/types/product';
import { cn } from '@/utils/cn';
import type { ComponentProps, FC } from 'react';
import { ProductDiscount } from '../components/product-discount';

interface SearchItemProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  product: Product;
}

export const SearchItem: FC<SearchItemProps> = (props) => {
  const { product, className, ...rest } = props;
  const formatCurrency = useFormatCurrency();

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
        {product?.initialPrice && (
          <ProductDiscount
            initialPrice={product.initialPrice}
            price={product.price}
            variant="small"
          />
        )}
        <div className="ml-2">
          {product?.initialPrice && (
            <p className="text-text-secondary caption text-center line-through">
              {formatCurrency(product.initialPrice)}
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
