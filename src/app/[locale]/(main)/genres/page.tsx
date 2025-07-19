import { Container } from '@/components/container';
import { LinkCategories } from '@/components/link-categories';
import Head from 'next/head';
import { listGenres } from './api';

export default async function Genres() {
  const genres = await listGenres();

  return (
    <>
      <Head>
        <title>Genres</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">
          <h1 className="h2 mb-10">Genres</h1>
          <LinkCategories
            items={genres.map((genre) => ({
              label: genre.name,
              href: `/genres/${genre.slug}`,
            }))}
          />
        </Container>
      </div>
    </>
  );
}
