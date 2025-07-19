import { Container } from '@/components/container';
import { LinkCategories } from '@/components/link-categories';
import Head from 'next/head';
import { listFeatures } from './api';

export default async function Features() {
  const features = await listFeatures();

  return (
    <>
      <Head>
        <title>Features</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">
          <h1 className="h2 mb-10">Features</h1>
          <LinkCategories
            items={features.map((developer) => ({
              label: developer.name,
              href: `/features/${developer.slug}`,
            }))}
          />
        </Container>
      </div>
    </>
  );
}
