'use client';

import { useLayout } from '@/store/layout';
import { IconButton } from '@mui/material';
import { MenuIcon } from 'lucide-react';

export const MenuButton = () => {
  const handleOpenSidebar = useLayout((state) => state.handleOpenSidebar);

  return (
    <IconButton onClick={handleOpenSidebar}>
      <MenuIcon />
    </IconButton>
  );
};
