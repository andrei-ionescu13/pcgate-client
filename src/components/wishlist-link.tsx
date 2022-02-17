import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Badge, Box } from '@mui/material';
import { Heart as HeartIcon } from '../icons/heart';
import { useStoreSelector } from '../hooks/use-store-selector';

export const WishlistLink: FC = () => {
  const wishlistProducts = useStoreSelector((state) => state.wishlist.products);

  return (
    <Badge
      badgeContent={wishlistProducts.length}
      showZero
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: '#fff',
          color: '#000'
        },
        mx: 2
      }}
    >
      <Box
        component={RouterLink}
        sx={{
          alignItems: 'center',
          backgroundColor: '#1E4582',
          borderRadius: 2,
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          p: 1
        }}
        to="/wishlist"
      >
        <HeartIcon
          fontSize="small"
          sx={{ color: 'inherit' }}
        />
      </Box>
    </Badge>
  );
};
