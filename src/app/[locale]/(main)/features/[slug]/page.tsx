//todo change this
import { Container } from '@/components/container';
import { PaginationQuery } from '@/components/pagination-query';
import { ProductsGrid } from '@/components/products-grid';
import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import { Genre as Feature } from '@/types/common';
import { Product } from '@/types/product';
import { appFetch } from '@/utils/app-fetch';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { MainLayout } from 'layout/layout';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { NextPageWithLayout } from 'temp-pages/pages/_app';

const getFeature =
  (slug: string, config: Record<string, any> = {}) =>
  () =>
    appFetch<Feature>({
      url: `/features/${slug}`,
      ...config,
    });

const getProducts =
  (query: ParsedUrlQuery, config: Record<string, any> = {}) =>
  () =>
    appFetch<{ products: Product[]; count: number }>({
      url: `/products`,
      query,
      ...config,
    });

const Feature: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { slug, page, sortBy } = query as {
    slug: string;
    page?: string;
    sortBy: string;
  };
  const { data: feature } = useQuery(['feature', slug], getFeature(slug));
  const {
    data: productData,
    isRefetching,
    isPreviousData,
  } = useQuery(
    [
      'products',
      {
        features: feature?.name,
        page: page || null,
        sortBy: sortBy || null,
      },
    ],
    getProducts({ features: feature?.name, page, sortBy }),
    { keepPreviousData: true, enabled: !!feature }
  );

  if (!feature || !productData) return null;

  const { products, count } = productData;

  const items = [
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
        <title>{feature.name} feature</title>
      </Head>
      <div className="py-10">
        <Container maxWidth="lg">
          <div className="mb-10 flex items-center">
            <h1 className="h2">{feature.name} feature</h1>
            <div className="flex-1" />
            <SortByPopoverQuery items={items} />
          </div>
          <ProductsGrid
            products={products}
            isLoading={isRefetching && isPreviousData}
          />
          {Math.ceil(count / 36) !== 1 && (
            <div className="mb-20 flex justify-center">
              <PaginationQuery
                size="large"
                count={Math.ceil(count / 36)}
                variant="outlined"
                color="primary"
              />
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const { slug, page, sortBy } = query as {
    slug: string;
    page?: string;
    sortBy: string;
  };
  const queryClient = new QueryClient();

  try {
    const feature = await queryClient.fetchQuery(
      ['feature', slug],
      getFeature(slug, { req, res })
    );

    if (feature) {
      await queryClient.fetchQuery(
        [
          'products',
          {
            features: feature.name,
            page: page || null,
            sortBy: sortBy || null,
          },
        ],
        getProducts({ features: feature.name, page, sortBy }, { req, res })
      );
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      query,
    },
  };
};

export default Feature;

Feature.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
