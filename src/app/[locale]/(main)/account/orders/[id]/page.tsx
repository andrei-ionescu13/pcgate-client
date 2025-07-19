import { PropertyItem } from '@/components/property-item';
import { List } from '@mui/material';
import { format } from 'date-fns';
import Head from 'next/head';
import { LibraryProduct } from '../../../../../../components/library-product';
import { getUserOrder } from './api';

interface OrderProps {
  params: {
    id: string;
  };
}

const Order = async (props: OrderProps) => {
  const { params } = props;
  const { id } = params;
  const order = await getUserOrder(id);

  return (
    <>
      <Head>
        <title>Order</title>
      </Head>
      <div>
        <h4 className="mb-10">Order Details</h4>
        <div className="hidden md:block">
          <div className="subtitle1 flex bg-[#1E4582] py-4 text-[#FFF] first-of-type:flex-2">
            <div className="flex-2 px-4">
              <p>Order Number</p>
            </div>
            <div className="flex-1 px-4">
              <p>Date</p>
            </div>
            <div className="flex-1 px-4">
              <p>Status</p>
            </div>
            <div className="flex-1 px-4">
              <p>Total</p>
            </div>
          </div>
          <div className="bg-default text-secondary body1 flex py-2">
            <div className="flex-2 px-4">
              <p>{order._id}</p>
            </div>
            <div className="flex-1 px-4">
              <p>{format(new Date(order.createdAt), 'MMMM dd, y')}</p>
            </div>
            <div className="flex-1 px-4">
              <p>COMPLETE</p>
            </div>
            <div className="flex-1 px-4">
              <p>
                {order.currency.symbol}
                {order.totalPrice}
              </p>
            </div>
          </div>
        </div>
        <List
          sx={{
            display: {
              md: 'none',
            },
          }}
        >
          <PropertyItem
            content={order._id}
            label="Order number"
            align={'horizontal'}
          />
          <PropertyItem
            content={format(new Date(order.createdAt), 'MMMM dd, y')}
            label="Date"
            align={'horizontal'}
          />
          <PropertyItem
            content="COMPLETE"
            label="Status"
            align={'horizontal'}
          />
          <PropertyItem
            content={`${order.currency.symbol}${order.totalPrice}`}
            label="Total"
            align={'horizontal'}
          />
        </List>
        <h5 className="my-10">Order Items</h5>
        <div className="mt-10 flex flex-col gap-4">
          {order.lineItems.map((item) =>
            item.keys.map((key) => (
              <LibraryProduct
                product={item.product}
                productKey={key}
                key={key._id}
                // onActivateKey={onActivateKey}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
