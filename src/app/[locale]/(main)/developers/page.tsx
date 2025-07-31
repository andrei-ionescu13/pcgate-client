import { Container } from '@/components/container';
import { LinkCategories } from '@/components/link-categories';
import Head from 'next/head';
import { listDevelopers } from './api';

export default async function Developers() {
  const developers = await listDevelopers();

  return (
    <>
      <Head>
        <title>Developers</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">
          <h1 className="h2 mb-10">Developers</h1>
          <LinkCategories
            items={developers.map((developer) => ({
              label: developer.name,
              href: `/developers/${developer.slug}`,
            }))}
          />
        </Container>
      </div>
    </>
  );
}
