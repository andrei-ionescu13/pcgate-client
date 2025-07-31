import { Container } from '@/components/container';
import Head from 'next/head';
import { getCart } from './api';
import { CartDetails } from './cart-details';

export default async function Cart() {
  const cart = await getCart();

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className="flex-1 py-10">
        <Container maxWidth="lg">
          <h4 className="mb-4">Cart</h4>
          <CartDetails initialCart={cart} />
        </Container>
      </div>
    </>
  );
}
