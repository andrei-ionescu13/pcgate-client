import type { FC, MouseEvent as ReactMouseEvent } from 'react';
import { FormControlLabel, IconButton } from '@mui/material';
import { Heart as HeartIcon } from '../icons/heart';
import { HeartOutlined as HeartOutlinedIcon } from '../icons/heart-outlined';
import { useStoreSelector } from 'hooks/use-store-selector';
import { useAddWishlistItem } from 'api/products';

interface WishlistButtonProps {
  productId: string;
  label?: string;
}

export const WishlistButton: FC<WishlistButtonProps> = (props) => {
  const { productId, label = '' } = props;
  const wishlistProducts = useStoreSelector((state) => state.wishlist.products);
  const isWishlisted = wishlistProducts.map((product) => product._id).includes(productId);

  const { mutate, isLoading } = useAddWishlistItem();

  const handleIsFavorite = async (event: ReactMouseEvent<HTMLElement>) => {
    if (isLoading) return;
    event.preventDefault();
    mutate(productId);
  };

  return (
    <FormControlLabel
      control={(
        <IconButton
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
