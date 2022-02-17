import type { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface ProductLabelProps {
  variant: string;
}

export const ProductLabel: FC<ProductLabelProps> = () => {
  return (
    <Box
      sx={{
        width: 'fit-content',
        position: 'absolute',
        top: -5,
        left: -5
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            py: 0.25,
            px: 0.5,
            backgroundColor: 'info.main',
          }}
        >
          <Typography
            color="#fff"
            sx={{ textTransform: 'uppercase' }}
            variant="caption"
          >
            Star Deal
          </Typography>
        </Box>
        <Box
          sx={{
            clipPath: 'polygon(0 0, 100% 0, 1px 100%, 0 100%)',
            backgroundColor: 'info.main',
            ml: '-1px',
            width: 20
          }}
        />
      </Box>
      <Box
        sx={{
          clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
          width: 5,
          height: 5,
          backgroundColor: 'info.dark'
        }}
      />
    </Box>
  );
};
