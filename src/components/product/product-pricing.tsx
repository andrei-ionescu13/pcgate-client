import type { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { Link } from '@/components/link';
// import { WishlistButton } from '@/components/wishlist-button';
import { ShoppingCart as ShoppingCartIcon } from '@/icons/shopping-cart';
import { Uplay as UplayIcon } from '@/icons/uplay';
import { Rockstar as RockstarIcon } from '@/icons/rockstar';
import { Steam as SteamIcon } from '@/icons/steam';
import { useSettings } from '@/contexts/settings-context';
import numeral from 'numeral';
import type { Product } from '@/types/product';
import { ProductDiscount } from '../product-discount';
import { AppImage } from '@/components/app-image';
import { AddButton } from '@/components/add-button';
import { useFormatCurrency } from '@/hooks/use-format-currency';

const icons = {
  rockstar: <RockstarIcon sx={{ fontSize: 72, height: 'fit-content' }} />,
  steam: <SteamIcon />,
  uplay: <UplayIcon />,
};

interface ProductPricingProps {
  product: Product;
}

export const ProductPricing: FC<ProductPricingProps> = (props) => {
  const { product } = props;
  const formatCurrency = useFormatCurrency();

  return (
    <Card>
      <AppImage
        layout='responsive'
        alt={product.title}
        height={9}
        src={product.cover.public_id}
        width={16}
      />
      <CardContent
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gap: 2
        }}
      >
        <Box sx={{ width: '64px', position: 'relative', pb: 5, color: 'text.primary' }} >
          <AppImage
            priority
            src={product.platform.logo.public_id}
            alt={product.platform.name}
            sizes="
                (min-width: 1200px) 400px,
                (min-width: 900px) 33vw,
                (min-width: 600px) 50vw"
            layout='fill'
            objectFit="contain"
          />
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              color="textSecondary"
              sx={{ textDecoration: 'line-through' }}
              variant="body1"
            >
              {formatCurrency(product.initialPrice)}
            </Typography>
            <Typography
              color="textPrimary"
              sx={{ fontWeight: 600 }}
              variant="h5"
            >
              {formatCurrency(product.price)}
            </Typography>
          </Box>
          {product.initialPrice && (
            <ProductDiscount
              initialPrice={product.initialPrice}
              price={product.price}
            />
          )}
        </Box>
        <AddButton
          fullWidth
          size="large"
          productId={product._id}
        >
          Add to cart
        </AddButton>
      </CardContent>
    </Card>
  );
};
