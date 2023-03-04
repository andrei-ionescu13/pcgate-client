import type { FC } from 'react';
import { Button, Card, Typography } from '@mui/material';
import { Link } from '@/components/link';

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
      component={Link}
      href="/games"
      sx={{ mt: 2 }}
      variant="contained"
    >
      View all deals
    </Button>
  </Card>
);
