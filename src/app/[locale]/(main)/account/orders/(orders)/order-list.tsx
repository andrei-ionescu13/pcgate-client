'use client';

import { DataOverlay } from '@/components/data-overlay';
import { PaginationParam } from '@/components/pagination-param';
import type { FC } from 'react';
import { SearchOrdersData } from './api';
import { useSearchOrders } from './api-hooks';
import { Order } from './order';

interface OrderListProps {
  initialData: SearchOrdersData;
}

export const OrderList: FC<OrderListProps> = (props) => {
  const { initialData } = props;
  const { data, isRefetching, isPlaceholderData } = useSearchOrders();
  const { orders, count } = data || initialData;

  return (
    <div>
      <div className="subtitle1 bg-primary py-4 text-[#fff]">
        <p className="px-4 md:hidden">Order</p>
        <div className="hidden md:flex [&>div]:px-4">
          <div className="flex-1">
            <p>Date</p>
          </div>
          <div className="flex-2">
            <p>Items</p>
          </div>
          <div className="flex-1">
            <p>Status</p>
          </div>
          <div className="flex-1">
            <p>Action</p>
          </div>
        </div>
      </div>

      <DataOverlay
        className="bg-default"
        isBlured={isRefetching && isPlaceholderData}
      >
        {orders?.map((order) => (
          <Order
            key={order._id}
            order={order}
          />
        ))}
      </DataOverlay>
      {count > 12 && (
        <div className="mt-10 flex justify-center">
          <PaginationParam count={Math.ceil(count / 12)} />
        </div>
      )}
    </div>
  );
};
