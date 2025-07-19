'use client';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useTimeout } from '@/hooks/use-timeout';
import { Minus as MinusIcon } from '@/icons/minus';
import { Plus as PlusIcon } from '@/icons/plus';
import { IconButton } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface CartItemQuantityProps {
  quantity: number;
  maxQuantity: number;
  onUpdateQuantity: (quantity: number) => void;
  hideButtons?: boolean;
}

export const CartItemQuantity: FC<CartItemQuantityProps> = (props) => {
  const {
    quantity: quantityProp,
    onUpdateQuantity,
    maxQuantity,
    hideButtons,
  } = props;
  const isMounted = useIsMounted();
  const [quantity, setQuantity] = useState<number>(quantityProp);
  const { reset } = useTimeout(() => onUpdateQuantity(quantity), 1000);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemove = () => {
    setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    if (isMounted && quantityProp !== quantity) {
      reset();
    }
  }, [quantity]);

  useEffect(() => {
    setQuantity(quantityProp);
  }, [quantityProp]);

  return (
    <div className="flex items-center gap-1">
      <IconButton
        sx={{ visibility: hideButtons ? 'hidden' : undefined }}
        size="small"
        // disabled={isLoading}
        onClick={handleRemove}
        disabled={quantity === 1}
      >
        <MinusIcon fontSize="small" />
      </IconButton>
      <p>{quantity}</p>
      <IconButton
        sx={{ visibility: hideButtons ? 'hidden' : undefined }}
        size="small"
        disabled={quantity >= maxQuantity}
        onClick={handleAdd}
      >
        <PlusIcon fontSize="small" />
      </IconButton>
    </div>
  );
};
