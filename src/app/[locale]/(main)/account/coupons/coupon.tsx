'use client';

import { Card } from '@/components/card';
import { CopyTextButton } from '@/components/copy-text-button';
import { Link, useRouter } from '@/i18n/navigation';
import type { Coupon as CouponI } from '@/types/common';
import { cn } from '@/utils/cn';
import { Button } from '@mui/material';
import { format } from 'date-fns';
import { Fragment } from 'react';
import { useApplyCoupon } from '../../cart/cart-coupon';
import { useCart } from '@/store/cart';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface CouponProps {
  coupon: CouponI;
}

export const Coupon = ({ coupon }: CouponProps) => {
  const active = coupon.status === 'active';
  const applyCoupon = useApplyCoupon();
  const { setCart } = useCart();
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <Card
      className="p-2"
      color="default"
    >
      <div className="flex content-center">
        <p className="subtitle1">{coupon.code}</p>
        <div className="flex-1" />
        <CopyTextButton
          text={coupon.code}
          disabled={!active}
        />
      </div>
      <p className="body2">
        {coupon.value}
        {coupon.type === 'percentage' ? '%' : '$'} off
      </p>
      <p className="body2">
        Applies to{' '}
        {coupon.productSelection === 'general'
          ? 'any product'
          : !!coupon.products &&
            coupon.products.map((product, index) => (
              <Fragment key={product._id}>
                <Link
                  className="body2"
                  href={`/products/${product.slug}`}
                >
                  {product.title}
                </Link>
                {!!coupon.products &&
                  coupon.products.length > index + 1 &&
                  ', '}
              </Fragment>
            ))}
      </p>
      {coupon.endDate && active && (
        <p className="body3 text-text-secondary">
          Expires on {format(new Date(coupon.endDate), 'dd.MM.yyyy hh:mm')}
        </p>
      )}
      <div className="mt-1">
        {active ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              applyCoupon.mutate(coupon.code, {
                onSuccess: (data) => {
                  queryClient.setQueryData(['cart'], data);
                  setCart(data);
                  router.push('/cart');
                },
                onError: (error) => {
                  toast.error(error.message);
                },
              });
            }}
          >
            Apply
          </Button>
        ) : (
          <p
            className={cn(
              'subtitle2',
              coupon.status === 'used' ? 'text-info' : 'text-error'
            )}
          >
            {coupon.status === 'used' ? 'Used' : 'Expired'}
          </p>
        )}
      </div>
    </Card>
  );
};
