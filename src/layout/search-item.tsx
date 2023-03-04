import type { FC } from 'react';
import numeral from 'numeral';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import type { SxProps } from '@mui/system';
import { Link } from '../components/link';
import { ProductDiscount } from '../components/product-discount';
import { Steam as SteamIcon } from '@/icons/steam';
import { Product } from '@/types/product';
import { AppImage } from '@/components/app-image';
import { useFormatCurrency } from '@/hooks/use-format-currency';

interface SearchItemProps {
  product: Product;
  sx?: SxProps;
}

const SearchItemRoot = styled(Link)(
  ({ theme }) => ({
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
      textDecoration: 'none'
    }
  }));

export const SearchItem: FC<SearchItemProps> = (props) => {
  const { product } = props;
  const formatCurrency = useFormatCurrency();

  return (
    <SearchItemRoot
      color="inherit"
      href={`/games/${product.slug}`}
      underline="none"
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '120px',
        }}
      >
        <AppImage
          priority
          src={product.cover.public_id}
          alt={product.title}
          sizes="120px"
          height={9}
          width={16}
          layout="responsive"
        />
      </Box>
      <Box
        sx={{
          maxWidth: 300,
          ml: 2,
          py: 1
        }}
      >
        <Typography
          color="textPrimary"
          variant="body2"
        >
          {product.title}
        </Typography>
        <Box sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 0.5
        }}
        >
          <SteamIcon />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        {product?.initialPrice && (
          <ProductDiscount
            initialPrice={product.initialPrice}
            price={product.price}
            variant="small"
          />
        )}
        <Box sx={{ ml: 1 }}>
          {product?.initialPrice && (
            <Typography
              align="center"
              color="textSecondary"
              component="p"
              sx={{ textDecoration: 'line-through' }}
              variant="caption"
            >
              {formatCurrency(product.initialPrice)}
            </Typography>
          )}
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle1"
          >
            {formatCurrency(product.price)}
          </Typography>
        </Box>
      </Box>
    </SearchItemRoot>
  );
};
