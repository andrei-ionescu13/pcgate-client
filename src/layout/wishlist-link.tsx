import { Badge } from '@/components/badge';
import { Link } from '@/i18n/navigation';
import { Heart as HeartIcon } from '@/icons/heart';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

export const WishlistLink: FC = () => {
  const wishlistProducts = useSelector((state) => state.wishlist.products);

  return (
    <Badge content={wishlistProducts?.length}>
      <Link
        href="/wishlist"
        className="flex cursor-pointer items-center rounded-lg bg-[#1E4582] p-2"
      >
        <HeartIcon fontSize="small" />
      </Link>
    </Badge>
  );
};
