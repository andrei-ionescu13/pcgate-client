import { Button } from '@/components/button';
import { Link } from '@/i18n/navigation';
import { Card } from '@mui/material';
import type { FC } from 'react';

export const CartEmpty: FC = () => (
  <Card
    elevation={0}
    sx={{
      display: 'grid',
      p: 4,
      placeItems: 'center',
    }}
  >
    <p className="h6">Your cart is currently empty</p>
    <Button
      asChild
      color="primary"
      className="mt-2"
      variant="contained"
    >
      <Link href="/products">View all deals</Link>
    </Button>
  </Card>
);
