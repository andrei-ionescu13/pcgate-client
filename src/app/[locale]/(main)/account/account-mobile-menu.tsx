'use client';

import { Button } from '@/components/button';
import { Drawer } from '@mui/material';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { AccountSidebar } from './account-sidebar';

export const AccountMobileMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
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
        <AccountSidebar onLinkClick={handleCloseDrawer} />
      </Drawer>
      <Button
        onClick={handleOpenDrawer}
        color={'paper'}
        className="mb-4 inline-flex w-full justify-start lg:hidden"
      >
        <MenuIcon className="mr-4" />
        Account menu
      </Button>
    </>
  );
};
