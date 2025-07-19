//todo make it a server component
'use client';
import { Button } from '@/components/button';
import { Link } from '@/i18n/navigation';
import type { Order as OrderI } from '@/types/orders';
import { List, ListItem } from '@mui/material';
import type { SxProps } from '@mui/system';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import type { FC } from 'react';

interface OrderProps {
  order: OrderI;
  sx?: SxProps;
}

const OrderRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  '& > div': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    '& > div': {
      paddingBottom: theme.spacing(0.5),
      paddingTop: theme.spacing(0.5),
    },
  },
}));

export const Order: FC<OrderProps> = (props) => {
  const { order, ...rest } = props;

  return (
    <OrderRoot
      className="text-text-secondary"
      {...rest}
    >
      <div className="order-1 flex-1">
        <p className="text-text-secondary subtitle2">
          {format(new Date(order.createdAt), 'MMMM dd, y')}
        </p>
      </div>
      <div className="text-text-secondary order-3 flex-2 md:order-2">
        <List disablePadding>
          {order.lineItems.map((item, index) => (
            <ListItem
              disableGutters
              disablePadding
              key={item._id}
              divider={index + 1 < order.lineItems.length}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <p className="body2">
                {item.product.title}
                {item.quantity > 1 && `(x${item.quantity})`}
              </p>
              <p className="body3">
                {order.currency.symbol}
                {item.finalLinePrice}
              </p>
            </ListItem>
          ))}
        </List>
      </div>
      <div className="order-2 flex-1 md:order-3">
        <p className="subtitle2 uppercase">{order.fulfillmentStatus}</p>
      </div>
      <div className="order-4 flex-1">
        <Button
          asChild
          color="primary"
          variant="contained"
        >
          <Link href="/account/orders/${order._id}">View order</Link>
        </Button>
      </div>
    </OrderRoot>
  );
};
