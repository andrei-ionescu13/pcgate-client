import { useAuth } from '@/contexts/auth-context';
import { Google as GoogleIcon } from '@/icons/google';
import { Button } from '@mui/material';
import type { FC } from 'react';

interface GoogleAuthButtonProps {}

export const GoogleAuthButton: FC<GoogleAuthButtonProps> = (props) => {
  const { googleAuth } = useAuth();

  return (
    <Button
      onClick={() => {
        googleAuth();
      }}
      fullWidth
      color="darkGrey"
      variant="contained"
      size="large"
    >
      <GoogleIcon />
    </Button>
  );
};
