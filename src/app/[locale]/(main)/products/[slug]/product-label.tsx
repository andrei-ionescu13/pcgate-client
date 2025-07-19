import { Box } from '@mui/material';
import type { FC } from 'react';

interface ProductLabelProps {
  variant: string;
}

export const ProductLabel: FC<ProductLabelProps> = () => {
  return (
    <div className="absolute -top-10 -left-10 w-fit">
      <div className="flex">
        <div className="px-1 py-0.5">
          <p className="caption text-white uppercase">Star Deal</p>
        </div>
        <Box
          sx={{
            clipPath: 'polygon(0 0, 100% 0, 1px 100%, 0 100%)',
            backgroundColor: 'info.main',
            ml: '-1px',
            width: 20,
          }}
        />
      </div>
      <Box
        sx={{
          clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
          width: 5,
          height: 5,
          backgroundColor: 'info.dark',
        }}
      />
    </div>
  );
};
