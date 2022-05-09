import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import numeral from 'numeral';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import type { SxProps } from '@mui/system';
import { ProductDiscount } from './product-discount';
import { LoadingImage } from '../components/loading-image';
import { Steam as SteamIcon } from '../icons/steam';
import { useSettings } from '../contexts/settings-context';
import { Product } from '../types/product';

interface SearchItemProps {
  product: Product;
  sx?: SxProps;
}

const SearchItemRoot = styled(Link)<{ component: any; to: string; }>(
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
      backgroundColor: theme.palette.mode === 'light' ? '#F8F8F8' : '#0A182D'
    }
  }));

export const SearchItem: FC<SearchItemProps> = (props) => {
  const { product } = props;
  const { settings } = useSettings();

  return (
    <SearchItemRoot
      color="inherit"
      component={RouterLink}
      to={`/games/${product.slug}`}
      underline="none"
      {...props}
    >
      <Box
        sx={{
          display: {
            sm: 'block',
            xs: 'none'
          },
          width: 130
        }}
      >
        <LoadingImage
          alt=""
          height={540}
          src={`https://fanatical.imgix.net/product/original/${product.cover}?auto=compress,format&amp;w=960&amp;fit=crop&amp;h=540&amp;q=75`}
          sx={{ maxWidth: '100%' }}
          width={960}
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
          {product.name}
        </Typography>
        <Box sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 1
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
        {product.current_discount.display_percentage && (
          <ProductDiscount
            percentage={product.current_discount.percent * 100}
            sx={{ mr: 2 }}
          />
        )}
        <Box>
          {product.current_discount.display_percentage && (
            <Typography
              align="center"
              color="textSecondary"
              component="p"
              sx={{ textDecoration: 'line-through' }}
              variant="caption"
            >
              {settings.currencySymbol}
              {numeral(product.fullPrice[settings.currency] / 100).format('0,0.00')}
            </Typography>
          )}
          <Typography
            align="center"
            color="primary"
            variant="subtitle1"
          >
            {settings.currencySymbol}
            {numeral(product.price[settings.currency] / 100).format('0,0.00')}
          </Typography>
        </Box>
      </Box>
    </SearchItemRoot>
  );
};
