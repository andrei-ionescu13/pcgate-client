'use client';

import { AppBar } from '@mui/material';
import { NavbarPrimary } from './navbar-primary';
import { NavbarSecondary } from './navbar-secondary';

export const Navbar = () => {
  return (
    <AppBar className="shadow-header fixed top-0 right-0 left-0 flex flex-col">
      <NavbarPrimary />
      <NavbarSecondary />
    </AppBar>
  );
};
