'use client';

import { Badge } from '@/components/badge';
import { Link } from '@/i18n/navigation';
import { useWishlist } from '@/store/wishlist';
import { HeartIcon } from 'lucide-react';

export const WishlistLink = () => {
  const wishlistProducts = useWishlist((state) => state.products);

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
