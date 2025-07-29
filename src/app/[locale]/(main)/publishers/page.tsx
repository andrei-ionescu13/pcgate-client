import { Container } from '@/components/container';
import { LinkCategories } from '@/components/link-categories';
import { Publisher } from '@/types/publishers';
import { appFetch } from '@/utils/app-fetch';
import Head from 'next/head';

const listPublishers = () => appFetch<Publisher[]>({ url: '/publishers' });

export default async function Publishers() {
  const publishers = await listPublishers();

  return (
    <>
      <Head>
        <title>Publishers</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">
          <h1 className="h2 mb-10">Publishers</h1>
          <LinkCategories
            items={publishers.map((publisher) => ({
              label: publisher.name,
              href: `/publishers/${publisher.slug}`,
            }))}
          />
        </Container>
      </div>
    </>
  );
}
