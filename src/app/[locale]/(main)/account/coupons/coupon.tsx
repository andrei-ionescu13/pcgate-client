import { CopyTextButton } from '@/components/copy-text-button';
import { Link } from '@/i18n/navigation';
import { Coupon as CouponI } from '@/types/common';
import { cn } from '@/utils/cn';
import { Button, Card } from '@mui/material';
import { format } from 'date-fns';
import type { FC } from 'react';
import { Fragment } from 'react';

interface CouponProps {
  coupon: CouponI;
}

export const Coupon: FC<CouponProps> = (props) => {
  const { coupon: promoCode } = props;
  const active = promoCode.status === 'active';

  return (
    <Card
      sx={{
        backgroundColor: 'background.default',
        p: 1,
      }}
    >
      <div className="flex content-center">
        <p className="subtitle1">{promoCode.code}</p>
        <div className="flex-1" />
        <CopyTextButton
          text={promoCode.code}
          disabled={!active}
        />
      </div>
      <p className="body2">
        {promoCode.value}
        {promoCode.type === 'percentage' ? '%' : '$'} off
      </p>
      <p className="body2">
        Applies to{' '}
        {promoCode.productSelection === 'general'
          ? 'any product'
          : !!promoCode.products &&
            promoCode.products.map((product, index) => (
              <Fragment key={product._id}>
                <Link
                  className="body2"
                  href={`/products/${product.slug}`}
                >
                  {product.title}
                </Link>
                {!!promoCode.products &&
                  promoCode.products.length > index + 1 &&
                  ', '}
              </Fragment>
            ))}
      </p>
      {promoCode.endDate && (
        <p className="body3 text-text-secondary">
          Expire on {format(new Date(promoCode.endDate), 'dd.MM.yyyy hh:mm')}
        </p>
      )}
      <div className="mt-1">
        {active ? (
          <Button
            component={Link}
            href={`/cart?voucher=${promoCode.code}`}
            color="primary"
            variant="contained"
          >
            Apply
          </Button>
        ) : (
          <p
            className={cn(
              'subtitle2',
              promoCode.status === 'used' ? 'text-info' : 'text-error'
            )}
          >
            {promoCode.status === 'used' ? 'Used' : 'Expired'}
          </p>
        )}
      </div>
    </Card>
  );
};
