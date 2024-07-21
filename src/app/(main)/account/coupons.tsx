import Head from 'next/head';
import type { NextPage, GetServerSideProps } from 'next';
import { Box, Pagination, Typography } from '@mui/material';
import { appFetch } from '@/utils/app-fetch';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { AccountLayout } from 'layout/account/account-layout';
import { ChangeEvent, FC, FormEvent, useState, MouseEvent, Fragment } from 'react';
import { SearchInput } from '@/components/search-input';
import { Coupon } from '@/components/account/coupons/coupon';
import { Coupon as CouponI } from '@/types/coupon';
import { NextPageWithLayout } from 'temp-pages/pages/_app';
import { MainLayout } from 'layout/layout';

interface GetUserCouponsReturn {
  promoCodes: CouponI[];
  count: number;
}

const getUserCoupons = (query: Record<string, any>, config: Record<string, any> = {}) => () => appFetch<GetUserCouponsReturn>({
  url: '/auth/promo-codes',
  withAuth: true,
  query,
  ...config
})

const Coupons: NextPageWithLayout = () => {
  const [keyword, setKeyword] = useState('');
  const [queryKeyword, setQueryKeyword] = useState('');
  const [page, setPage] = useState(1);
  const query = {
    keyword: queryKeyword,
    page
  };
  const { data, error, isPreviousData, isRefetching } = useQuery(['promo-codes', query], getUserCoupons(query), { keepPreviousData: true })
  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleSubmit = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    setQueryKeyword(keyword)
  };

  if (!data) return null;
  const { promoCodes, count } = data;

  return (
    <>
      <Head>
        <title>Order</title>
      </Head>
      <Box>
        <Typography
          color="textPrimary"
          variant="h4"
          mb={3}
        >
          Coupons
        </Typography>
        <Box mb={5} sx={{ backgroundColor: '#12171E', borderRadius: '6px' }}>
          <form onSubmit={handleSubmit}>
            <SearchInput
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="Search by code"
            />
          </form>
        </Box>
        <Box
          sx={{
            position: 'relative',
            filter: (isRefetching && isPreviousData) ? 'blur(4px) saturate(100%)' : undefined,
            display: 'grid',
            gap: 2
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
          {promoCodes.map((promoCode) => (
            <Coupon
              coupon={promoCode}
              key={promoCode._id}
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
    page: 1
  }
  try {
    await queryClient.fetchQuery(['promo-codes', query], getUserCoupons(query, { req, res }))
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}
export default Coupons;


Coupons.getLayout = (page: React.ReactElement) => {
  return (
    <MainLayout>
      <AccountLayout>
        {page}
      </AccountLayout>
    </MainLayout>
  )
}