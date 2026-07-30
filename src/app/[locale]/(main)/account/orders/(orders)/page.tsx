import { DataOverlay } from '@/components/data-overlay';
import { NoData } from '@/components/no-data';
import { PaginationParam } from '@/components/pagination-param';
import { SearchParam } from '@/components/search-param';
import Head from 'next/head';
import { searchOrders } from './api';
import { Order } from './order';

type OrdersProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const Orders = async ({ searchParams }: OrdersProps) => {
  const params = await searchParams;
  const data = await searchOrders(params);
  const { orders, count } = data;

  return (
    <>
      <Head>
        <title>Order</title>
      </Head>
      <div>
        <h4>Orders</h4>
        <p className="body1 text-text-secondary mt-4 mb-10">
          To view an order in more detail, and to view the keys associated with
          that order, simply click on View Order for the appropriate order.
        </p>
        <div className="mb-10">
          <SearchParam />
        </div>
        <div className="overflow-hidden rounded-md">
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

          {!orders.length ? (
            <NoData />
          ) : (
            <>
              <DataOverlay>
                <div className="bg-default">
                  {orders?.map((order) => (
                    <Order
                      key={order._id}
                      order={order}
                    />
                  ))}
                </div>
              </DataOverlay>
            </>
          )}
        </div>
        {count > 12 && orders.length && (
          <div className="mt-10 flex justify-center">
            <PaginationParam count={Math.ceil(count / 12)} />
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
