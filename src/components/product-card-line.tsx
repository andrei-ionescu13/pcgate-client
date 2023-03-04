import type { FC } from 'react';
import { Box, Card, Typography } from '@mui/material';
import { Link } from './link';
import { ProductDiscount } from './product-discount';
import type { Product } from '@/types/product';
import { AppImage } from './app-image';
import { AddButton } from './add-button';
import { useFormatCurrency } from '@/hooks/use-format-currency';

interface ProductCardLineProps {
  loading?: boolean;
  product: Product;
  variant?: 'line' | 'card';
}

export const ProductCardLine: FC<ProductCardLineProps> = (props) => {
  const { product } = props;
  const formatCurrency = useFormatCurrency();

  return (
    <Card
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        textDecoration: 'none',
        p: 1,
      }}
    >
      <Box
        sx={{
          width: '30%',
          maxWidth: 220,
          minWidth: 100,
          overflow: 'hidden',
          'img': {
            borderRadius: 1
          }
        }}
      >
        <Link href={`/games/${product.slug}`}>
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
      </Box>
      <Box
        sx={{
          px: 1,
          display: 'flex',
          flex: 1,
          flexDirection: {
            md: 'row',
            xs: 'column'
          },
          alignItems: {
            md: 'center',
            xs: 'stretch'
          },
          gap: {
            md: 0,
            xs: 1
          },
        }}
      >
        <Link
          color="inherit"
          href={`/games/${product.slug}`}
          underline="none"
          variant="body1"
        >
          {product.title}
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',

            }}
          >
            {product.initialPrice && (
              <ProductDiscount
                sx={{ mr: 1 }}
                variant="small"
                initialPrice={product.initialPrice}
                price={product.price}
              />
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  minWidth: {
                    md: 64,
                    xs: 'none'
                  }
                }}
              >
                {product.initialPrice && (
                  <Typography
                    color="textSecondary"
                    sx={{ textDecoration: 'line-through' }}
                    variant="caption"
                  >
                    {formatCurrency(product.initialPrice)}
                  </Typography>
                )}
                <Typography
                  color="textPrimary"
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                >
                  {formatCurrency(product.price)}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }} />
              <AddButton
                productId={product._id}
                sx={{ ml: 1 }}
              >
                Add
              </AddButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card >
  );
};
