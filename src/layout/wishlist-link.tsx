import { Link } from '@/i18n/navigation';
import { Heart as HeartIcon } from '@/icons/heart';
import { Badge } from '@mui/material';
import type { FC } from 'react';
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
          color: '#000',
        },
      }}
    >
      <Link
        href="/wishlist"
        className="flex cursor-pointer items-center rounded-lg bg-[#1E4582] p-2"
      >
        <HeartIcon fontSize="small" />
      </Link>
    </Badge>
  );
};
