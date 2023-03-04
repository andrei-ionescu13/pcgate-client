import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { Pagination, Box, Typography } from '@mui/material';
import { AccountLayout } from 'layout/account/account-layout';
import { SearchInput } from '../../components/search-input';
import { SortByPopover } from '@/components/sort-by-popover';
import { appFetch } from '@/utils/app-fetch';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { UserReview as UserReviewI } from '@/types/user';
import { UserReview } from '@/components/account/reviews/user-review';
import { Layout } from 'layout/layout';
import { NextPageWithLayout } from 'pages/_app';

interface GetUserReviewsReturn {
  reviews: UserReviewI[];
  count: number;
}

const items = [
  {
    value: 'createdAt',
    label: 'Added at'
  },
  {
    value: 'productTitle',
    label: 'Alphabetical'
  }
];

const getUserReviews = (query: Record<string, any>, config: Record<string, any> = {}) => () => appFetch<GetUserReviewsReturn>({
  url: '/auth/reviews',
  withAuth: true,
  query,
  ...config
});

const Reviews: NextPageWithLayout = () => {
  const [keyword, setKeyword] = useState('');
  const [queryKeyword, setQueryKeyword] = useState('');
  const [sortBy, setSortBy] = useState(items[0].value);
  const [page, setPage] = useState(1);
  const query = {
    keyword: queryKeyword,
    sortBy,
    page
  };

  const { data, error, isPreviousData, isRefetching } = useQuery(['user-reviews', query], getUserReviews(query), { keepPreviousData: true })

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

  if (!data) return null;
  const { reviews, count } = data;

  const handleDelete = () => {
    if (reviews.length === 1) {
      setPage(prev => prev === 1 ? prev : prev - 1);
    }
  }

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
          Reviews
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
            items={items}
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
          {reviews.map((review) => (
            <UserReview
              review={review}
              key={review._id}
              onDelete={handleDelete}
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
    await queryClient.fetchQuery(['user-reviews', query], getUserReviews(query, { req, res }))
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

export default Reviews;

Reviews.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <AccountLayout>
        {page}
      </AccountLayout>
    </Layout>
  )
}