'use client';

import { AppBar } from '@mui/material';
import type { FC } from 'react';
import { NavbarPrimary } from './navbar-primary';
import { NavbarSecondary } from './navbar-secondary';

interface NavbarProps {
  onOpenSidebar: () => void;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { onOpenSidebar } = props;

  return (
    <AppBar
      sx={{
        backgroundColor: '#12171E',
        backgroundImage: 'initial',
      }}
    >
      <NavbarPrimary onOpenSidebar={onOpenSidebar} />
      <NavbarSecondary />
    </AppBar>
  );
};
