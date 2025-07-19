'use client';
import { Cart } from '@/types/cart';
import { Alert } from '@mui/material';
import { useEffect, useState, type FC } from 'react';

interface CartAlertsProps {
  cart: Cart;
}

export const CartAlerts: FC<CartAlertsProps> = (props) => {
  const { cart } = props;

  const [showAlert, setShowAlert] = useState(
    cart?.hasPriceChanged || cart?.hasQuantityChanged || cart?.hasUnavailable
  );
  const [alertSeverity, setAlertSeverity] = useState<'error' | 'warning'>(
    cart?.hasUnavailable ? 'error' : 'warning'
  );

  useEffect(() => {
    setShowAlert(
      cart?.hasPriceChanged || cart?.hasQuantityChanged || cart?.hasUnavailable
    );
    setAlertSeverity(cart?.hasUnavailable ? 'error' : 'warning');
  }, [cart?.hasPriceChanged, cart?.hasQuantityChanged, cart?.hasUnavailable]);

  if (!showAlert) return null;

  return (
    <Alert
      severity={alertSeverity}
      onClose={() => {
        setShowAlert(false);
      }}
    >
      {cart.hasPriceChanged && (
        <>
          The price of some products have changed
          <br />
        </>
      )}
      {cart.hasQuantityChanged &&
        'The availability of some products have changed'}
      {cart.hasUnavailable && 'Please remove the unavailable products'}
    </Alert>
  );
};
