import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { Box, Divider, Typography } from '@mui/material';
import { AccountSecurity } from '@/components/account/account-security';
import { AccountWebsiteSettings } from '@/components/account/account-website-settings';
import { NextPageWithLayout } from 'temp-pages/pages/_app';

export default function Account() {
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
