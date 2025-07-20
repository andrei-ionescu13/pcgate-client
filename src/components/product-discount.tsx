//todo make this a server component
'use client';

import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

const productDiscount = cva(
  'items-center bg-success rounded-2xl flex text-white max-h-6',
  {
    variants: {
      variant: {
        small: 'px-2',
        medium: 'px-3',
        large: 'px-6',
      },
    },
  }
);

interface ProductDiscountProps
  extends ComponentProps<'div'>,
    VariantProps<typeof productDiscount> {
  initialPrice: number;
  price: number;
}

export const ProductDiscount: FC<ProductDiscountProps> = (props) => {
  const { variant = 'medium', className, initialPrice, price, ...rest } = props;

  return (
    <div
      className={cn(productDiscount({ variant, className }))}
      {...rest}
    >
      <p className="body3">
        -{Math.floor(((initialPrice - price) * 100) / initialPrice)}%
      </p>
    </div>
  );
};
