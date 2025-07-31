//todo make it a server component
'use client';
import { Button } from '@/components/button';
import { Link } from '@/i18n/navigation';
import type { Order as OrderI } from '@/types/orders';
import { cn } from '@/utils/cn';
import { format } from 'date-fns';
import type { ComponentProps, FC } from 'react';

interface OrderProps extends ComponentProps<'div'> {
  order: OrderI;
}

export const Order: FC<OrderProps> = (props) => {
  const { order, className, ...rest } = props;

  return (
    <div
      className={cn(
        'text-text-secondary flex flex-col py-2 md:flex-row [&>div]:px-4 [&>div]:py-1 md:[&>div]:py-0',
        className
      )}
      {...rest}
    >
      <div className="order-1 flex-1">
        <p className="text-text-secondary subtitle2">
          {format(new Date(order.createdAt), 'MMMM dd, y')}
        </p>
      </div>
      <div className="text-text-secondary order-3 flex-2 md:order-2">
        <ul>
          {order.lineItems.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between"
            >
              <p className="body2">
                {item.product.title}
                {item.quantity > 1 && `(x${item.quantity})`}
              </p>
              <p className="body3">
                {order.currency.symbol}
                {item.finalLinePrice}
              </p>
            </li>
          ))}
        </ul>
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
          <Link href={`/account/orders/${order._id}`}>View order</Link>
        </Button>
      </div>
    </div>
  );
};
