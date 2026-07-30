import { useAuth } from '@/contexts/auth-context';
import { GoogleIcon } from '@/icons/google';
import { Button } from '@mui/material';

export const GoogleAuthButton = () => {
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
      <GoogleIcon className="w-6" />
    </Button>
  );
};
