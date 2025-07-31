'use client';

import { Container } from '@/components/container';
import { LibraryProduct } from '@/components/library-product';
import { Spinner } from '@/components/spinner';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { getUserOrderByStripeId } from './api';

const Checkout = () => {
  const { id } = useParams<{ id: string }>();

  const { data, refetch } = useQuery({
    queryKey: ['checkout', id],
    queryFn: () => getUserOrderByStripeId(id),
  });

  useEffect(() => {
    let timeout: NodeJS.Timer;

    if (data) {
      timeout = setInterval(() => {
        console.log(data);
        if (data?.paymentStatus === 'pending') {
          refetch();
        } else {
          clearInterval(timeout);
        }
      }, 3000);
    }

    return () => {
      if (timeout) clearInterval(timeout);
    };
  }, [data?.paymentStatus]);

  const getContent = () => {
    if (data?.paymentStatus === 'pending') {
      return (
        <div className="grid place-items-center">
          <h4 className="mb-4">Preparing your order</h4>
          <Spinner />
        </div>
      );
    }

    if (data?.paymentStatus === 'expired') {
      return (
        <div>
          <p>Your Order has been canceled</p>
        </div>
      );
    }

    if (data?.paymentStatus == 'paid') {
      return (
        <div>
          <h2 className="h3 mb-5 text-center">Your products</h2>
          <div className="flex flex-col gap-4">
            {data.lineItems.map((item) =>
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
      );
    }
  };
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className="flex-1 py-10">
        <Container maxWidth="lg">{getContent()}</Container>
      </div>
    </>
  );
};

export default Checkout;
