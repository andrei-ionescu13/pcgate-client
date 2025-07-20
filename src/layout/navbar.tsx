'use client';

import type { FC } from 'react';
import { NavbarPrimary } from './navbar-primary';
import { NavbarSecondary } from './navbar-secondary';

interface NavbarProps {
  onOpenSidebar: () => void;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { onOpenSidebar } = props;

  return (
    <header className="shadow-header fixed top-0 right-0 left-0 z-[1100] flex flex-col bg-[#12171E]">
      <NavbarPrimary onOpenSidebar={onOpenSidebar} />
      <NavbarSecondary />
    </header>
  );
};
