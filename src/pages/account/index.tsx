import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { Box, Divider, Typography } from '@mui/material';
import { AccountSecurity } from '@/components/account/account-security';
import { AccountWebsiteSettings } from '@/components/account/account-website-settings';
import { AccountLayout } from 'layout/account/account-layout';
import { NextPageWithLayout } from 'pages/_app';
import { Layout } from 'layout/layout';

const Account: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Account Settings</title>
      </Head>
      <Box>
        <Typography
          color="textPrimary"
          variant="h4"
        >
          Account Settings
        </Typography>
        <Divider sx={{ my: 4 }} />
        <AccountSecurity />
        <AccountWebsiteSettings sx={{ mt: 4 }} />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, req, res, locale, ...rest }) => {
  return {
    props: {
    }
  }
}

export default Account;

Account.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <AccountLayout>
        {page}
      </AccountLayout>
    </Layout>
  )
}