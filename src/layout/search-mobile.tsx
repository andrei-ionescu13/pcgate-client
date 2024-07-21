"use client"

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Drawer, IconButton } from '@mui/material';
import { Search } from 'layout/search';
import { Search as SearchIcon } from '@/icons/search';
import { useRouter } from 'next/router';

export const SearchMobile: FC = () => {
  const { asPath } = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [asPath])

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{ color: '#fff' }}
      >
        <SearchIcon />
      </IconButton>
      <Drawer
        anchor="top"
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            p: 1
          }
        }}
      >
        <Search
          isFocused
          onBlur={handleClose}
        />
      </Drawer>
    </>
  );
};
