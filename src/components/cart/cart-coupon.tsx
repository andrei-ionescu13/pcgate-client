import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Box, Button, Card, InputBase, Typography } from '@material-ui/core';

export const CartCoupon: FC = () => {
  const [code, setCode] = useState('');

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value);
  };

  return (
    <Card
      sx={{ p: 2 }}
      elevation={0}
    >
      <Typography
        color="textPrimary"
        sx={{ mb: 1.5 }}
        variant="h5"
      >
        Coupon
      </Typography>
      <Typography
        color="textSecondary"
        sx={{ mb: 1 }}
        variant="body2"
      >
        Do you have a coupon code?
      </Typography>
      <form>
        <Box sx={{ display: 'flex' }}>
          <InputBase
            inputProps={{
              onChange: handleCodeChange,
              sx: {
                fontSize: 14,
                px: 1.5,
                py: 1
              },
              value: code
            }}
            placeholder="Enter coupon code"
            sx={{
              backgroundColor: 'background.default',
              flex: 1,
              borderRadius: 2,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            }}
          />
          <Button
            color="primary"
            variant="contained"
            sx={{
              borderRadius: 2,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
            }}
          >
            Apply
          </Button>
        </Box>
      </form>
    </Card>
  );
};
