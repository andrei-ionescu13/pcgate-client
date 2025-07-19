'use client';

import { Container } from '@/components/container';
import { Menu as MenuIcon } from '@/icons/menu';
import { Button, Card, Drawer } from '@mui/material';
import type { FC, MouseEvent, ReactNode } from 'react';
import { useState } from 'react';
import { AccountSidebar } from './account-sidebar';

interface AccountLayoutProps {
  children: ReactNode;
}

const AccountLayout: FC<AccountLayoutProps> = (props) => {
  const { children } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (event: MouseEvent<HTMLButtonElement>) => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = (event: MouseEvent<HTMLButtonElement>) => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Drawer
        sx={{
          marginTop: '110px',
          width: 240,
          flexShrink: 0,
          position: 'relative',
          '& .MuiDrawer-paper': {
            marginTop: '110px',
            height: 'calc(100% - 110px)',
            width: 240,
            boxSizing: 'border-box',
          },
          '& .MuiBackdrop-root': {
            marginTop: '110px',
          },
        }}
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <AccountSidebar />
      </Drawer>
      <div className="min-h-full py-10">
        <Container
          maxWidth="lg"
          className="h-full"
        >
          <Button
            onClick={handleOpenDrawer}
            color="darkGrey"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              justifyContent: 'flex-start',
              mb: 2,
              display: {
                lg: 'none',
                xs: 'inline-flex',
              },
            }}
          >
            <MenuIcon sx={{ mr: 2 }} />
            Account menu
          </Button>
          <Card
            sx={{
              backgroundColor: 'background.paper',
              position: 'relative',
              display: 'grid',
              height: '100%',
              gridTemplateColumns: {
                lg: '240px 1fr',
                xs: '1fr',
              },
            }}
          >
            <div className="border-r-divider sticky top-0 hidden border-r lg:block">
              <AccountSidebar />
            </div>
            <div className="p-4 md:p-10">{children}</div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default AccountLayout;
