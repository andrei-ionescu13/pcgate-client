import { AppImage } from '@/components/app-image';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import { Link } from '@/i18n/navigation';
import { Steam as SteamIcon } from '@/icons/steam';
import { Product } from '@/types/product';
import type { SxProps } from '@mui/system';
import { styled } from '@mui/system';
import type { FC } from 'react';
import { ProductDiscount } from '../components/product-discount';

interface SearchItemProps {
  product: Product;
  sx?: SxProps;
}

const SearchItemRoot = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  display: 'flex',
  paddingRight: theme.spacing(2),
  '& + &': {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    textDecoration: 'none',
  },
}));

export const SearchItem: FC<SearchItemProps> = (props) => {
  const { product } = props;
  const formatCurrency = useFormatCurrency();

  return (
    <SearchItemRoot
      color="inherit"
      href={`/products/${product.slug}`}
    >
      <div className="relative aspect-video w-full max-w-[120px]">
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
    </SearchItemRoot>
  );
};
