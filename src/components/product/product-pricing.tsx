import type { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { LoadingImage } from 'components/loading-image';
import { ProductDiscount } from '../../components/product-discount';
import { WishlistButton } from '../../components/wishlist-button';
import { ShoppingCart as ShoppingCartIcon } from '../../icons/shopping-cart';
import { Uplay as UplayIcon } from '../../icons/uplay';
import { Rockstar as RockstarIcon } from '../../icons/rockstar';
import { Steam as SteamIcon } from '../../icons/steam';
import { useSettings } from '../../contexts/settings-context';
import { useStoreSelector } from '../../hooks/use-store-selector';
import { useAddCartItem } from 'api/cart';
import type { Product } from '../../types/product';

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
  const navigate = useNavigate();
  const { settings } = useSettings();
  const items = useStoreSelector((state) => state.cart.items);
  const isInCart = Boolean(items.find((item) => item.product._id === product?._id));

  const { mutate, isLoading } = useAddCartItem();

  return (
    <Card elevation={0}>
      <LoadingImage
        alt=""
        height={540}
        src={`https://fanatical.imgix.net/product/original/${product.cover}?auto=compress,format&amp;w=960&amp;fit=crop&amp;h=540&amp;q=75`}
        sx={{
          maxWidth: '100%',
          borderTopLeftRadius: 1,
          borderTopRightRadius: 1
        }}
        width={960}
      />
      <CardContent
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gap: 2
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {icons[product.drm_string]}
          <Box sx={{ flexGrow: 1 }} />
          <WishlistButton
            label="Add to Wishlist"
            productId={product._id}
          />
        </Box>
        {product.editions && (
          <Grid
            container
            spacing={2}
          >
            {product.editions.map((edition) => (
              <Grid
                item
                key={edition.edition_name}
                sm={6}
                xs={12}
              >
                <Button
                  component={RouterLink}
                  fullWidth
                  to={`/games/${edition.slug}`}
                  variant={product.edition_name === edition.edition_name ? 'contained' : 'outlined'}
                >
                  {edition.edition_name}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Typography
            color="textPrimary"
            sx={{ fontWeight: 600 }}
            variant="h5"
          >
            {settings.currencySymbol}
            {product.price[settings.currency] / 100}
          </Typography>
          {product.current_discount.display_percentage && (
            <>
              <Typography
                color="textSecondary"
                sx={{
                  mx: 2,
                  textDecoration: 'line-through'
                }}
                variant="body1"
              >
                {settings.currencySymbol}
                {product.fullPrice[settings.currency] / 100}
              </Typography>
              <ProductDiscount
                percentage={product.current_discount.percent * 100}
                variant="large"
              />
            </>
          )}
        </Box>
        <Button
          color="primary"
          disabled={isLoading}
          fullWidth
          onClick={() => isInCart ? navigate('/cart') : mutate(product._id)}
          size="large"
          startIcon={<ShoppingCartIcon />}
          variant="contained"
        >
          {isInCart ? 'Checkout now' : 'Add to cart'}
        </Button>
      </CardContent>
    </Card >
  );
};
