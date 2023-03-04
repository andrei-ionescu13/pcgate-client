import { FC, useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Plus as PlusIcon } from '@/icons/plus';
import { Minus as MinusIcon } from '@/icons/minus';
import { useTimeout } from '@/hooks/use-timeout';
import { useIsMounted } from '@/hooks/use-is-mounted';

interface CartItemQuantityProps {
  quantity: number;
  maxQuantity: number;
  onUpdateQuantity: (quantity: number) => void;
  hideButtons?: boolean;
}

export const CartItemQuantity: FC<CartItemQuantityProps> = (props) => {
  const { quantity: quantityProp, onUpdateQuantity, maxQuantity, hideButtons } = props;
  const isMounted = useIsMounted();
  const [quantity, setQuantity] = useState<number>(quantityProp)
  const { reset } = useTimeout(() => onUpdateQuantity(quantity), 1000);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleRemove = () => {
    setQuantity((prev) => prev - 1)
  }

  useEffect(() => {
    if (isMounted && quantityProp !== quantity) {
      reset();
    }
  }, [quantity])

  useEffect(() => {
    setQuantity(quantityProp)
  }, [quantityProp])

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        gap: 0.5
      }}
    >
      <IconButton
        sx={{ visibility: hideButtons ? 'hidden' : undefined }}
        size="small"
        color="white"
        // disabled={isLoading}
        onClick={handleRemove}
        disabled={quantity === 1}
      >
        <MinusIcon fontSize="small" />
      </IconButton>
      <Typography
        color="textPrimary"
        variant="body1"
      >
        {quantity}
      </Typography>
      <IconButton
        sx={{ visibility: hideButtons ? 'hidden' : undefined }}
        size="small"
        color="white"
        disabled={quantity >= maxQuantity}
        onClick={handleAdd}
      >
        <PlusIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}