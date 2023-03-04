import type { FC } from 'react';
import { Box, Card, Divider, Typography } from '@mui/material';
import { Link } from './link';
import { ProductDiscount } from './product-discount';
import { WishlistButton } from '../layout/wishlist-button';
import type { Product } from '@/types/product';
import { AppImage } from './app-image';
import { AddButton } from './add-button';
import { useFormatCurrency } from '@/hooks/use-format-currency';

interface ProductCardProps {
  loading?: boolean;
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
  const formatCurrency = useFormatCurrency();
  const { product } = props;

  return (
    <Card
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'initial',
        position: 'relative',
        textDecoration: 'none',
        '& img': {
          maxWidth: '100%',
          borderTopLeftRadius: (theme) => theme.shape.borderRadius,
          borderTopRightRadius: (theme) => theme.shape.borderRadius
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 999
        }}
      >
        <WishlistButton productId={product._id} />
      </Box>
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
                (min-width: 600px) 50vw
                "
        />
      </Link>
      <Box
        sx={{
          p: 1,
          alignItems: 'center',
        }}
      >
        <Link
          color="inherit"
          href={`/games/${product.slug}`}
          sx={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            wordBreak: 'break-all',
            display: {
              sm: '-webkit-box',
              xs: 'none'
            }
          }}
          underline="none"
          variant="body2"
        >
          {product.title}
        </Link>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
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
              display: 'grid',
              placeItems: 'center'
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
              variant="body2"
              sx={{ fontWeight: 500 }}
            >
              {formatCurrency(product.price)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 1,
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Box sx={{ width: '48px', position: 'relative', pb: 5 }} >
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
        <Box sx={{ flexGrow: 1 }} />
        <AddButton productId={product._id}>
          Add
        </AddButton>
      </Box>
    </Card >
  );
};
