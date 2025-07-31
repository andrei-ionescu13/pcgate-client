'use client';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { PaginationParam } from '@/components/pagination-param';
import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import { ViewModeButton } from '@/components/view-mode-button';
import { AdjustmentsHorizontal as AdjustmentsHorizontalIcon } from '@/icons/adjustments-horizontal';
import { Drawer } from '@mui/material';
import { useSearchProducts } from 'app/[locale]/(main)/api-calls-hooks';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { ProductList } from '../../../../../components/product-list';
import { ProductsFilterChip } from './products-filter-chip';
import { ProductsFilters } from './products-filters';

export interface OptionI {
  label: string;
  value: string | number;
}

const sortByitems = [
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'price_asc',
    label: 'Price low',
  },
  {
    value: 'price_desc',
    label: 'Price heigh',
  },
  {
    value: 'discount',
    label: 'Discount',
  },
  {
    value: 'release_date',
    label: 'Release Date',
  },
];

export const ProductsContent = ({ initialData }) => {
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const query: any = {};

  for (const [key, value] of searchParams.entries()) {
    if (!!query[key]) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  const { error, data, isRefetching, isPlaceholderData } =
    useSearchProducts(query);

  const mappedQuery: Array<[string, string]> = [];
  const chipFor = [
    'price_min',
    'price_max',
    'os',
    'platforms',
    'genres',
    'publishers',
    'developers',
    'features',
  ];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const handleViewModeChange = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  chipFor.forEach((chip) => {
    searchParams
      .getAll(chip)
      .forEach((value) => mappedQuery.push([chip, value]));
  });

  const { products, productCount, filters } = data || initialData;

  const {
    platforms,
    genres,
    publishers,
    developers,
    features,
    operatingSystems,
  } = filters || {};

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
      <Head>
        <title>Store</title>
      </Head>
      <div className="py-10">
        <Container
          maxWidth="lg"
          ref={containerRef}
        >
          <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-[220px_1fr]">
            <div />
            <div className="grid w-full gap-2">
              <div className="flex w-full gap-2">
                <Button
                  variant="outlined"
                  onClick={handleOpenDrawer}
                  className="md:hidden"
                >
                  <p className="body2 mr-2">Filters</p>
                  <AdjustmentsHorizontalIcon />
                </Button>
                <div className="flex-1" />
                <div className="hidden md:block">
                  <ViewModeButton
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                  />
                </div>
                <SortByPopoverQuery
                  items={sortByitems}
                  defaultValue={'name'}
                />
              </div>
              <div className="flex justify-end md:hidden">
                <ViewModeButton
                  viewMode={viewMode}
                  onViewModeChange={handleViewModeChange}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {mappedQuery.map(([key, value]) => (
                  <ProductsFilterChip
                    key={`${key}-${value}`}
                    field={key}
                    value={value}
                  />
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <ProductsFilters
                platforms={platforms}
                genres={genres}
                publishers={publishers}
                developers={developers}
                features={features}
                operatingSystems={operatingSystems}
              />
            </div>
            <div>
              <ProductList
                products={products}
                viewMode={viewMode}
                isLoading={isRefetching && isPlaceholderData}
              />
              {Math.ceil(productCount / 36) > 1 && (
                <div className="mt-20 flex justify-center">
                  <PaginationParam count={Math.ceil(productCount / 36)} />
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
