import { useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import numeral from 'numeral';
import { Box, Button, Card, Divider, Link, Skeleton, Typography } from '@mui/material';
import { ProductLabel } from './product/product-label';
import { ProductDiscount } from './product-discount';
import { WishlistButton } from './wishlist-button';
import { ShoppingCart as ShoppingCartIcon } from '../icons/shopping-cart';
import { Steam as SteamIcon } from '../icons/steam';
import { useSettings } from '../contexts/settings-context';
import { useStoreSelector } from '../hooks/use-store-selector';
import type { Product } from '../types/product';
import { useAddCartItem } from 'api/cart';

interface ProductCardProps {
  loading?: boolean;
  product?: Product;
  variant?: 'line' | 'card';
}

export const ProductCard: FC<ProductCardProps> = (props) => {
  const { product, variant = 'card', loading = false } = props;
  const items = useStoreSelector((state) => state.cart.items);
  const { settings } = useSettings();
  const [coverLoaded, setCoverLoaded] = useState<boolean>(false);
  const isInCart = Boolean(items.find((item) => item.product._id === product?._id));

  const { mutate, isLoading } = useAddCartItem();

  if (variant === 'card') {
    if (loading) {
      return (
        <Card>
          <Skeleton
            variant="rectangular"
            sx={{ pb: '56.285714285714285%' }}
          />
          <Box
            sx={{
              height: 64,
              p: 1
            }}
          >
            <Skeleton
              variant="text"
              sx={{
                height: 'calc(1rem * 1.5)',
                width: '80%'
              }}
            />
          </Box>
          <Divider />
          <Skeleton
            variant="rectangular"
            height={46}
          />
        </Card>
      );
    }

    if (product) {
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
          {!coverLoaded && (
            <Skeleton
              variant="rectangular"
              sx={{ pb: '56.285714285714285%' }}
            />
          )}
          <Link
            component={RouterLink}
            sx={{ display: 'contents' }}
            to={`/games/${product.slug}`}
          >
            <img
              alt=""
              onLoad={() => setCoverLoaded(true)}
              src={`https://fanatical.imgix.net/product/original/${product.cover}?auto=compress,format&w=350&fit=crop&h=197`}
              style={{ display: !coverLoaded ? 'none' : undefined }}
            />
          </Link>
          <Box
            sx={{
              p: 1,
              alignItems: 'flex-start',
              display: 'flex',
            }}
          >
            <Link
              color="inherit"
              component={RouterLink}
              to={`/games/${product.slug}`}
              sx={{
                height: 'calc(1rem * 1.5 * 2)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
              underline="none"
              variant="body1"
            >
              {product.name}
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <WishlistButton productId={product._id} />
          </Box>
          <Divider />
          <Box
            sx={{
              p: 1,
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <SteamIcon />
            <Box sx={{ flexGrow: 1 }} />
            {product.current_discount.display_percentage && (
              <>
                <Typography
                  color="textSecondary"
                  sx={{
                    textDecoration: 'line-through',
                    mr: 1
                  }}
                  variant="caption"
                >
                  {settings.currencySymbol}
                  {numeral(product.price[settings.currency] / 100).format('0,0.00')}
                </Typography>
                <ProductDiscount
                  percentage={product.current_discount.percent * 100}
                  sx={{ mr: 1 }}
                  variant="small"
                />
              </>
            )}
            <Button
              color="primary"
              disabled={isLoading}
              onClick={() => { if (!isInCart) mutate(product._id); }}
              startIcon={<ShoppingCartIcon />}
              size="small"
              sx={{
                minWidth: 68,
                '& .add-label': {
                  display: 'none'
                },
                '& .MuiButton-startIcon': {
                  display: 'none'
                },
                ...(!isInCart && {
                  '&:hover': {
                    '& .add-label': {
                      display: 'block'
                    },
                    '& .price': {
                      display: 'none'
                    },
                    '& .MuiButton-startIcon': {
                      display: 'inline-flex'
                    }
                  }
                })
              }}
              variant="contained"
            >
              {isInCart ? (
                'In cart'
              ) : (
                <>
                  <span className="price">
                    {settings.currencySymbol}
                    {numeral(product.currentPrice[settings.currency] / 100).format('0,0.00')}
                  </span>
                  <span className="add-label">
                    Add
                  </span>
                </>
              )}
            </Button>
          </Box>
          <ProductLabel variant="as" />
        </Card >
      );
    }
  }

  if (product)
    return (
      <Card
        elevation={0}
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          p: 1.5
        }}
      >
        <Box
          sx={{
            display: 'block',
            '& img': {
              borderRadius: 1,
              display: 'block',
              maxWidth: 220
            }
          }}
        >
          <img
            alt=""
            src="https://hb.imgix.net/24ee40d7cc08d164bee3dab438b4cada89268adc.jpg?auto=compress,format&fit=crop&h=206&w=360&s=36c1e7358f2a8a6e232ca746493bfc28"
          />
        </Box>
        <Box
          sx={{
            maxWidth: 300,
            ml: 2
          }}
        >
          <Link
            color="textPrimary"
            component={RouterLink}
            to="/asd"
            underline="none"
            variant="body2"
          >
            Among the Sleep - Enhanced Edition
          </Link>
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            mt: 1
          }}
          >
            <SteamIcon />
            <WishlistButton productId={product._id} />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Box
            sx={{
              mb: 1,
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <ProductDiscount
              percentage={product.current_discount.percent * 100}
              sx={{ mr: 1 }}
              variant="small"
            />
            <Box>
              <Typography
                align="center"
                color="textSecondary"
                sx={{ textDecoration: 'line-through' }}
                variant="body2"
              >
                {settings.currencySymbol}
                {numeral(product.price[settings.currency] / 100).format('0,0.00')}
              </Typography>
              <Typography
                align="center"
                color="textPrimary"
                component="p"
                variant="h6"
              >
                {settings.currencySymbol}
                {numeral(product.currentPrice[settings.currency] / 100).format('0,0.00')}
              </Typography>
            </Box>
          </Box>
          <Button

            fullWidth
            color="primary"
            size="large"
            variant="contained"
          >
            Add
          </Button>
        </Box>
      </Card>
    );

  return null;
};
