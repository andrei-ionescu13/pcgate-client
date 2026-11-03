import { Container } from '@/components/container';
import Head from 'next/head';
import { getWishlist } from './api';
import { WishlistProducts } from './wishlist-products';

export default async function Wishlist() {
  const wishlistedProducts = await getWishlist();

  return (
    <>
      <Head>
        <title>Wishlist</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">
          <h3 className="mb-12">Wishlist</h3>
          <WishlistProducts products={wishlistedProducts} />
        </Container>
      </div>
    </>
  );
}
