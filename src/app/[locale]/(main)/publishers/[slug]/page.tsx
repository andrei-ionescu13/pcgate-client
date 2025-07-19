import { Container } from '@/components/container';
import Head from 'next/head';

export default function Publisher() {
  return (
    <>
      <Head>
        <title>Store</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">Publisher</Container>
      </div>
    </>
  );
}
