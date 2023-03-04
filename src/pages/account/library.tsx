import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { Box, Typography, Pagination } from '@mui/material';
import { SearchInput } from '../../components/search-input';
import { appFetch } from '@/utils/app-fetch';
import { dehydrate, QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { AccountLayout } from 'layout/account/account-layout';
import { SortByPopover, } from '@/components/sort-by-popover';
import { LibraryProduct } from '@/components/library-product';
import type { Product } from '@/types/product';
import type { LibraryItem } from '@/types/library';
import type { ProductKey } from '@/types/common';
import { NextPageWithLayout } from 'pages/_app';
import { Layout } from 'layout/layout';

//create checkout
//add eslint maybe

const sortByItems = [
  {
    value: 'createdAt',
    label: 'Added at'
  },
  {
    value: 'productTitle',
    label: 'Alphabetical'
  }
];

interface GetLibraryReturn {
  items: LibraryItem[];
  count: number;
}

const getLibrary = (query: Record<string, any>, config: Record<string, any> = {}) => () => appFetch<GetLibraryReturn>({
  url: '/auth/library',
  withAuth: true,
  query,
  ...config
});

const Library: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState('');
  const [queryKeyword, setQueryKeyword] = useState('');
  const [sortBy, setSortBy] = useState<string>(sortByItems[0].value);
  const [page, setPage] = useState(1);
  const query = {
    keyword: queryKeyword,
    sortBy,
    page
  };

  const { data, error, isPreviousData, isRefetching } = useQuery(['library', query], getLibrary(query), { keepPreviousData: true })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  const handleSortByChange = (value: string): void => {
    setSortBy(value)
    setPage(1);
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleSubmit = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    setQueryKeyword(keyword)
  };

  const onActivateKey = (keyValue: string, product: Product, productKey: ProductKey): void => {
    queryClient.setQueryData<GetLibraryReturn>(['library', query], (prev) => {
      if (!prev) return;

      const items = prev.items
      const item = items.find((item) => item.key._id === productKey._id);

      if (item) {
        item.key.value = keyValue;

        return {
          ...prev,
          items
        }
      }
    })
  }

  if (!data) return null;
  const { items, count } = data;

  return (
    <>
      <Head>
        <title>Account Settings</title>
      </Head>
      <Box>
        <Typography
          color="textPrimary"
          variant="h4"
          mb={3}
        >
          Library
        </Typography>
        <form onSubmit={handleSubmit}>
          <SearchInput
            value={keyword}
            onChange={handleKeywordChange}
          />
        </form>
        <Box
          sx={{
            mt: 2,
            mb: 5,
          }}
        >
          <SortByPopover
            items={sortByItems}
            value={sortBy}
            onChange={handleSortByChange}
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            filter: (isRefetching && isPreviousData) ? 'blur(4px) saturate(100%)' : undefined,
            position: 'relative'
          }}
        >
          {(isRefetching && isPreviousData) && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 999,
              }}
            />
          )}
          {items.map((item) => (
            <LibraryProduct
              product={item.product}
              productKey={item.key}
              key={item._id}
              onActivateKey={onActivateKey}
            />
          ))}
        </Box>
        {count > 2 && (
          <Box
            sx={{
              mt: 5,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Pagination
              count={Math.ceil(count / 2)}
              variant="outlined"
              color="primary"
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, req, res }) => {
  const queryClient = new QueryClient()
  const query = {
    keyword: '',
    sortBy: 'createdAt',
    page: 1
  }
  try {
    await queryClient.fetchQuery(['library', query], getLibrary(query, { req, res }))
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...await serverSideTranslations(locale, ['common', 'footer']),
    }
  }
}

export default Library;

Library.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <AccountLayout>
        {page}
      </AccountLayout>
    </Layout>
  )
}