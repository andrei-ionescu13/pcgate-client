import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, Typography } from '@material-ui/core';

export const CartEmpty: FC = () => (
  <Card
    elevation={0}
    sx={{
      display: 'grid',
      p: 4,
      placeItems: 'center'
    }}
  >
    <Typography
      color="textPrimary"
      component="p"
      variant="h6"
    >
      Your cart is currently empty
    </Typography>
    <Button
      color="primary"
      component={RouterLink}
      sx={{ mt: 2 }}
      to="/search"
      variant="contained"
    >
      View all deals
    </Button>
  </Card>
);
