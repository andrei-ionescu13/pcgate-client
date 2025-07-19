import type { FC } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@mui/material';
import { Google as GoogleIcon } from "@/icons/google";

interface GoogleAuthButtonProps { }

export const GoogleAuthButton: FC<GoogleAuthButtonProps> = (props) => {
  const { googleAuth } = useAuth();

  return (
    <Button
      onClick={() => { googleAuth() }}
      fullWidth
      color="darkGrey"
      variant="contained"
      size="large"
    >
      <GoogleIcon />
    </Button>
  )
}