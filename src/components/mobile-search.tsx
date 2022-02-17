import { useState } from 'react';
import type { FC } from 'react';
import { Drawer, IconButton } from '@mui/material';
import { Search } from '../components/search';
import { Search as SearchIcon } from '../icons/search';

export const MobileSearch: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          color: '#fff',
          display: {
            md: 'none'
          },
          mr: 1
        }}
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
        <Search />
      </Drawer>
    </>
  );
};
