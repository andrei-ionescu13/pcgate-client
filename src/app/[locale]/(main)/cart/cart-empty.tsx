import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Link } from '@/i18n/navigation';
import type { FC } from 'react';

export const CartEmpty: FC = () => (
  <Card className="grid place-items-center p-8">
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
