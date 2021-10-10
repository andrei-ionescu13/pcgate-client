import { useState } from 'react';
import type { FC, MouseEvent } from 'react';
import { FormControlLabel, IconButton } from '@material-ui/core';
import { Heart as HeartIcon } from '../icons/heart';
import { HeartOutlined as HeartOutlinedIcon } from '../icons/heart-outlined';
import { setWishlistProducts } from '../store/slices/wishlist';
import { useStoreDispatch } from '../hooks/use-store-dispatch';
import { useStoreSelector } from 'hooks/use-store-selector';
// import { useIsMounted } from '../../hooks/use-is-mounted';
import { authFetch } from '../utils/auth-fetch';
import type { Product } from '../types/product';

interface WishlistButtonProps {
  productId: string;
  label?: string;
}

export const WishlistButton: FC<WishlistButtonProps> = (props) => {
  const { productId, label = '' } = props;
  const appDispatch = useStoreDispatch();
  const wishlistProducts = useStoreSelector((state) => state.wishlist.products);
  const isWishlisted = wishlistProducts.map((product) => product._id).includes(productId);
  const [loading, setLoading] = useState(false);

  const handleIsFavorite = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const data = await authFetch<Product[]>('/users/wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId })
      });

      appDispatch(setWishlistProducts(data || []));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormControlLabel
      control={(
        <IconButton
          disabled={loading}
          onClick={handleIsFavorite}
          size="small"
          sx={{
            mt: -0.5,
            alignSelf: 'flex-start',
            color: (theme) => isWishlisted ? 'error.dark' : theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary'
          }}
        >
          {isWishlisted ? <HeartIcon /> : <HeartOutlinedIcon />}
        </IconButton>
      )}
      label={label}
      sx={{ m: 0 }}
    />
  );
};
