'use client';

import { IconButton } from '@/components/icon-button';
import { Drawer } from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchProducts } from './search-products';

export const SearchMobile = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SearchIcon />
      </IconButton>
      <Drawer
        anchor="top"
        onClose={handleClose}
        open={open}
        slotProps={{
          paper: {
            sx: { p: 1 },
          },
        }}
      >
        <SearchProducts
          isFocused
          onBlur={handleClose}
        />
      </Drawer>
    </>
  );
};
