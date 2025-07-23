import { SearchParam } from '@/components/search-param';
import Head from 'next/head';
import { searchOrders } from './api';
import { OrderList } from './order-list';

type OrdersProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const Orders = async (props: OrdersProps) => {
  const { searchParams } = props;
  const data = await searchOrders(searchParams);

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
        <OrderList initialData={data} />
      </div>
    </>
  );
};

export default Orders;
