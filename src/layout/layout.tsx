import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Box, Drawer, DrawerProps, List, ListItemButton, ListItemText, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';
import { Footer } from './footer';
import { Navbar } from './navbar';
import { useRouter } from 'next/router';
import { useOpen } from '@/hooks/use-open';
import { Link } from '@/components/link';
import { useTranslation } from 'next-i18next';
import { MobileSidebar } from './mobile-sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  const [openSidebar, handleOpenSidebar, handleCloseSidebar] = useOpen();
  const onMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <Navbar onOpenSidebar={handleOpenSidebar} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: {
            sm: '112px',
            xs: '56px'
          },
          background: 'background.default',
          height: '100%',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
      <MobileSidebar
        open={openSidebar && onMobile}
        onClose={handleCloseSidebar}
      />
    </Box>
  );
};
