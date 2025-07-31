'use client';

import { IconButton } from '@/components/icon-button';
import { Search as SearchIcon } from '@/icons/search';
import { Drawer } from '@mui/material';
import { SearchProducts } from 'layout/search-poducts';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

export const SearchMobile: FC = () => {
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
        PaperProps={{
          sx: {
            p: 1,
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
