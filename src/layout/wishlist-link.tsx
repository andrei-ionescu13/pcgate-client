import type { FC } from 'react';
import { Badge, Box } from '@mui/material';
import { Link } from '@/components/link';
import { Heart as HeartIcon } from '@/icons/heart';
import { useSelector } from 'react-redux';

export const WishlistLink: FC = () => {
  const wishlistProducts = useSelector((state) => state.wishlist.products);

  return (
    <Badge
      badgeContent={wishlistProducts?.length}
      showZero
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: '#fff',
          color: '#000'
        },
      }}
    >
      <Box
        component={Link}
        href="/wishlist"
        sx={{
          alignItems: 'center',
          backgroundColor: '#1E4582',
          borderRadius: 2,
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          p: 1
        }}
      >
        <HeartIcon
          fontSize="small"
          sx={{ color: 'inherit' }}
        />
      </Box>
    </Badge>
  );
};
