'use client';

import { Container } from '@/components/container';
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
    const timeout = setInterval(() => {
      if (data?.paymentStatus === 'pending') {
        refetch();
      } else {
        clearInterval(timeout);
      }
    }, 3000);

    return () => {
      if (timeout) clearInterval(timeout);
    };
  }, []);

  const getContent = () => {
    if (data?.paymentStatus === 'pending') {
      return (
        <div className="grid place-items-center">
          <h4 className="mb-4">Preparing your order</h4>
          <Spinner />
        </div>
      );
    }

    if (1) {
      return (
        <div>
          <p>Your Order has been canceled</p>
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
