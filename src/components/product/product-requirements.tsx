import type { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface ProductRequirementsProps {
  min: string;
  recommended: string;
}

export const ProductRequirements: FC<ProductRequirementsProps> = (props) => {
  const { min, recommended } = props;

  return (
    <Box
      sx={{
        color: 'text.primary',
        mt: 5,
        '& ul': {
          listStyleType: 'none',
          pl: 0
        },
        '& li': {
          mb: 0.5
        }
      }}
    >
      <Typography
        color="inherit"
        sx={{ mb: 2.5 }}
        variant="h5"
      >
        System Requirements
      </Typography>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          sm={6}
          xs={12}
        >
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            Minimum
          </Typography>
          <Typography
            variant="body3"
            dangerouslySetInnerHTML={{ __html: min }}
          />
        </Grid>
        <Grid
          item
          sm={6}
          xs={12}
        > <Typography
          color="textPrimary"
          variant="subtitle2"
        >
            Recommended
          </Typography>
          <Typography
            variant="body3"
            dangerouslySetInnerHTML={{ __html: recommended }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
