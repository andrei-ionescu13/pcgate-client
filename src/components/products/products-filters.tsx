import type { FC } from 'react';
import { Box } from '@mui/material';
import { FilterCardCheckbox } from '@/components/filter-card-checkbox';
import { FilterCardRange } from '@/components/filter-card-range';
import type { Genre, Platform } from '@/types/common';

interface ProductsFiltersProps {
  platforms: Platform[];
  genres: Genre[];
}

export const ProductsFilters: FC<ProductsFiltersProps> = (props) => {
  const { platforms, genres } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
    >
      <FilterCardRange
        field='price'
        min={0}
        max={900}
        title="Price"
      />
      <FilterCardCheckbox
        field="os"
        title="Genres"
        items={[
          {
            value: 'windows',
            label: 'Windows'
          },
          {
            value: 'mac',
            label: 'Mac'
          },
          {
            value: 'linux',
            label: 'Linux'
          }
        ]}
      />
      <FilterCardCheckbox
        field="platforms"
        title="Platforms"
        items={platforms.map((platform) => ({
          label: platform.name,
          value: platform.name.toLowerCase(),
        }))}
      />
      <FilterCardCheckbox
        field="genres"
        title="Genres"
        items={genres.map((genre) => ({
          label: genre.name,
          value: genre.name.toLowerCase(),
        }))}
      />
    </Box>
  )
}