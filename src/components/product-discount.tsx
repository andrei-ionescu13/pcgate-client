//todo make this a server component
'use client';

import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import type { SxProps } from '@mui/system';
import { styled } from '@mui/system';
import type { FC } from 'react';

type Variant = 'small' | 'medium' | 'large';

interface ProductDiscountRootProps extends BoxProps {
  variant?: Variant;
}

interface ProductDiscountProps {
  sx?: SxProps;
  variant?: Variant;
  initialPrice: number;
  price: number;
}

const ProductDiscountRoot = styled(
  ({ variant, ...props }: ProductDiscountRootProps) => <Box {...props} />
)<ProductDiscountRootProps>(({ theme, variant }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.success.main,
  borderRadius: 16,
  color: '#fff',
  display: 'flex',
  ...(variant === 'small' && {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    height: 24,
  }),
  ...(variant === 'medium' && {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    height: 24,
  }),
  ...(variant === 'large' && {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: 24,
  }),
}));

export const ProductDiscount: FC<ProductDiscountProps> = (props) => {
  const { variant = 'medium', initialPrice, price, ...rest } = props;

  return (
    <ProductDiscountRoot
      variant={variant}
      {...rest}
    >
      <p className="body3">
        -{Math.floor(((initialPrice - price) * 100) / initialPrice)}%
      </p>
    </ProductDiscountRoot>
  );
};
