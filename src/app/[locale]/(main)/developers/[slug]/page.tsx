import { Container } from '@/components/container';
import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import { searchProducts } from 'app/[locale]/(main)/api-calls';
import Head from 'next/head';
import { getDeveloper } from './api';
import { DeveloperProducts } from './developer-products';

interface DeveloperProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
  }>;
}

const Developer = async (props: DeveloperProps) => {
  const { params, searchParams } = props;
  const { slug } = await params;
  const { page, sortBy } = await searchParams;
  const developer = await getDeveloper(slug);

  const data = await searchProducts({
    developer: developer?.name,
    page,
    sortBy,
  });

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

  return (
    <>
      <Head>
        <title>{developer.name} developer</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">
          <div className="mb-10 flex items-center">
            <h1 className="h2">{developer.name}</h1>
            <div className="flex-1" />
            <SortByPopoverQuery
              items={sortByitems}
              defaultValue={'name'}
            />
          </div>
          <DeveloperProducts
            developer={developer.name}
            initialData={data}
          />
        </Container>
      </div>
    </>
  );
};

export default Developer;
