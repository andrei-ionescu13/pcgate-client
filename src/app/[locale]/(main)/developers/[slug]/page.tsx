import { Container } from '@/components/container';
import { PaginationParam } from '@/components/pagination-param';
import { ProductList } from '@/components/product-list';
import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import Head from 'next/head';
import { searchProducts } from '../../api-calls';
import { getDeveloper } from './api';

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

interface DeveloperProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
  }>;
}

const Developer = async ({ params, searchParams }: DeveloperProps) => {
  const { slug } = await params;
  const { page, sortBy } = await searchParams;
  const developer = await getDeveloper(slug);
  const data = await searchProducts({
    developer: developer?.name,
    page,
    sortBy,
  });
  const { products, count } = data;

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
          <div>
            <ProductList products={products} />
            {Math.ceil(count / 36) > 1 && (
              <div className="mt-20 flex justify-center">
                <PaginationParam count={Math.ceil(count / 36)} />
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Developer;
