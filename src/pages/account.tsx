import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Divider, Typography } from '@material-ui/core';
import { AccountSecurity } from '../components/account/account-security';
import { AccountWebsiteSettings } from '../components/account/account-website-settings';

export const Account: FC = () => {
  return (
    <>
      <Helmet>
        <title>Account Settings</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 5
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: 'background.paper',
              p: {
                md: 5,
                xs: 2
              }
            }}
          >
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
        </Container>
      </Box>
    </>
  );
};
