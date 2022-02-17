import { useState } from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';
import { Footer } from './footer';
import { Navbar } from './navbar';
import { MobileSidebar } from './mobile-sidebar';

export const Layout: FC = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{
      pt: {
        sm: '112px',
        xs: '56px'
      },
      minHeight: '100%',
      display: 'flex'
    }}
    >
      <Navbar onOpenSidebar={() => setOpenSidebar(true)} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
      <MobileSidebar
        onClose={() => setOpenSidebar(false)}
        open={mdDown && openSidebar}
      />
    </Box >
  );
};
