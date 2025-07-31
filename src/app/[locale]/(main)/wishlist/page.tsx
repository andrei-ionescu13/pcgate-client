import { Container } from '@/components/container';
import { ProductCard } from '@/components/product-card';
import Head from 'next/head';
import { getWishlist } from './api';

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
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistedProducts.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                refreshOnRemoveFromWislist
              />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
