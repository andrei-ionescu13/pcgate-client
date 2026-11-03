'use client';
import { IconButton } from '@/components/icon-button';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useTimeout } from '@/hooks/use-timeout';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CartItemQuantityProps {
  quantity: number;
  maxQuantity: number;
  onUpdateQuantity: (quantity: number) => void;
  hideButtons?: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

export const CartItemQuantity = ({
  quantity,
  onAdd,
  onRemove,
  maxQuantity,
  hideButtons,
}: CartItemQuantityProps) => {
  return (
    <div className="flex items-center gap-1">
      <IconButton
        className={hideButtons ? 'hidden' : ''}
        size="small"
        onClick={onRemove}
        disabled={quantity <= 1}
      >
        <MinusIcon />
      </IconButton>
      <p>{quantity}</p>
      <IconButton
        className={hideButtons ? 'hidden' : ''}
        size="small"
        disabled={quantity >= maxQuantity}
        onClick={onAdd}
      >
        <PlusIcon />
      </IconButton>
    </div>
  );
};
