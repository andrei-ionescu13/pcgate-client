import type { FC } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

interface ProductRequirementsProps {
  requirements: {
    win: {
      min: string;
      rec: string;
    }
  }
}

export const ProductRequirements: FC<ProductRequirementsProps> = (props) => {
  const { requirements } = props;

  return (
    <Box sx={{
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
        sx={{ mb: 4 }}
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
          <div dangerouslySetInnerHTML={{ __html: requirements.win.min }} />
        </Grid>
        <Grid
          item
          sm={6}
          xs={12}
        >
          <div dangerouslySetInnerHTML={{ __html: requirements.win.rec }} />
        </Grid>
      </Grid>
    </Box>
  );
};
