'use client';

import { Button } from '@/components/button';
import { Drawer } from '@mui/material';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import { ProductsFilters, type FilterOptions } from './products-filters';

interface ProductsDrawerProps {
  platforms: FilterOptions;
  genres: FilterOptions;
  publishers: FilterOptions;
  developers: FilterOptions;
  features: FilterOptions;
  operatingSystems: FilterOptions;
}

export const ProductsDrawer = ({
  platforms,
  genres,
  publishers,
  developers,
  features,
  operatingSystems,
}: ProductsDrawerProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Drawer
        sx={{
          marginTop: '110px',
          width: 320,
          flexShrink: 0,
          position: 'relative',
          '& .MuiDrawer-paper': {
            marginTop: '110px',
            height: 'calc(100% - 110px)',
            width: 320,
            boxSizing: 'border-box',
            p: 2,
          },
          '& .MuiBackdrop-root': {
            marginTop: '110px',
          },
        }}
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <ProductsFilters
          platforms={platforms}
          genres={genres}
          publishers={publishers}
          developers={developers}
          features={features}
          operatingSystems={operatingSystems}
        />
      </Drawer>
      <Button
        variant="outlined"
        onClick={handleOpenDrawer}
        className="md:hidden"
      >
        <p className="body2 mr-2">Filters</p>
        <SlidersHorizontalIcon />
      </Button>
    </>
  );
};
