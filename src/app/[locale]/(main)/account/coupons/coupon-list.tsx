'use client';

import { DataOverlay } from '@/components/data-overlay';
import { PaginationParam } from '@/components/pagination-param';
import type { FC } from 'react';
import { SearchCouponsData } from './api';
import { useSearchCoupons } from './api-hooks';
import { Coupon } from './coupon';

interface CouponsProps {
  initialData: SearchCouponsData;
}

export const CouponList: FC<CouponsProps> = (props) => {
  const { initialData } = props;
  const { error, data, isRefetching, isPlaceholderData } = useSearchCoupons();
  const { promoCodes, count } = initialData || data;

  return (
    <div>
      <DataOverlay
        isBlured={isRefetching && isPlaceholderData}
        className="grid gap-4"
      >
        {promoCodes.map((promoCode) => (
          <Coupon
            coupon={promoCode}
            key={promoCode._id}
          />
        ))}
      </DataOverlay>
      {count > 2 && (
        <div className="mt-10 flex content-center">
          <PaginationParam count={Math.ceil(count / 2)} />
        </div>
      )}
    </div>
  );
};
