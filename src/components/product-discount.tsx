import type { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/system';
import type { SxProps } from '@material-ui/system';

type Variant = 'small' | 'medium' | 'large';

interface ProductDiscountProps {
  percentage: number;
  sx?: SxProps;
  variant?: Variant;
}

const ProductDiscountRoot = styled(Box)<{ styleProps: { variant: Variant; } }>(
  ({ theme, styleProps }) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.success.main,
    borderRadius: theme.shape.borderRadius,
    color: '#fff',
    display: 'flex',
    height: 30,
    ...styleProps.variant === 'small' && ({
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }),
    ...styleProps.variant === 'medium' && ({
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }),
    ...styleProps.variant === 'large' && ({
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    })
  }));

export const ProductDiscount: FC<ProductDiscountProps> = (props) => {
  const { percentage, variant = 'medium' } = props;

  return (
    <ProductDiscountRoot
      styleProps={{ variant }}
      {...props}
    >
      <Typography
        color="inherit"
        variant="body2"
      >
        -
        {percentage}
        %
      </Typography>
    </ProductDiscountRoot>
  );
};
