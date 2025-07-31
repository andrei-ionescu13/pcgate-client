import { Container } from '@/components/container';
import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import { searchProducts } from 'app/[locale]/(main)/api-calls';
import Head from 'next/head';
import { getGenre } from './api';
import { GenreProducts } from './genre-products';

interface GenreProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page: string;
    sortBy: string;
  }>;
}

const sortByitems = [
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'price_asc',
    label: 'Price low',
  },
  {
    value: 'price_desc',
    label: 'Price heigh',
  },
  {
    value: 'discount',
    label: 'Discount',
  },
  {
    value: 'release_date',
    label: 'Release Date',
  },
];

const Genre = async (props: GenreProps) => {
  const { params, searchParams } = props;
  const { slug } = await params;
  const { page, sortBy } = await searchParams;
  const genre = await getGenre(slug);
  const data = await searchProducts({ genres: genre?.name, page, sortBy });

  return (
    <>
      <Head>
        <title>{genre.name} genre</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">
          <div className="mb-10 flex items-center">
            <h1 className="h2">{genre.name} genre</h1>
            <div className="flex-1" />
            <SortByPopoverQuery
              items={sortByitems}
              defaultValue={'name'}
            />
          </div>
          <GenreProducts
            genre={genre.name}
            initialData={data}
          />
        </Container>
      </div>
    </>
  );
};

export default Genre;
