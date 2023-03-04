import { useState } from 'react';
import type { FC } from 'react';
import { Box, Button, Card, Typography, styled } from '@mui/material';
import type { BoxProps } from '@mui/material';
import type { SxProps } from '@mui/system';
import { EmailChangeDialog } from '@/components/email-change-dialog';
import { Link } from '@/components/link';
import { PasswordChangeDialog } from '@/components/password-change-dialog';
import { useAuth } from '@/contexts/auth-context';

const AccountSecurityRoot = styled(Box)(({ }) => ({}))

interface AccountSecurityProps extends BoxProps { }

export const AccountSecurity: FC<AccountSecurityProps> = (props) => {
  const { decoded } = useAuth();
  const [emailChangeDialogOpen, setEmailChangeDialogOpen] = useState(false);
  const [passwordChangeDialogOpen, setPasswordChangeDialogOpen] = useState(false);

  return (
    <>
      <AccountSecurityRoot {...props}>
        <Typography
          color="textPrimary"
          sx={{ mb: 2 }}
          variant="h5"
        >
          Account Security
        </Typography>
        <Card
          sx={{
            backgroundColor: 'background.default',
            p: 2,
            '& > div:not(:last-child)': {
              mb: 4
            }
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: {
                sm: 'flex',
                xs: 'block'
              }
            }}
          >
            <Box>
              <Typography
                color="textSecondary"
                sx={{ textTransform: 'uppercase' }}
                variant="subtitle1"
              >
                Email Addres
              </Typography>
              <Typography
                color="textPrimary"
                variant="body2"
              >
                {decoded?.email}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="white"
              onClick={() => { setEmailChangeDialogOpen(true); }}
              variant="text"
            >
              Change Email Address
            </Button>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: {
                sm: 'flex',
                xs: 'block'
              }
            }}
          >
            <Box>
              <Typography
                color="textSecondary"
                sx={{ textTransform: 'uppercase' }}
                variant="subtitle1"
              >
                Password
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="white"
              onClick={() => { setPasswordChangeDialogOpen(true); }}
              variant="text"
            >
              Change Password
            </Button>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: {
                sm: 'flex',
                xs: 'block'
              }
            }}
          >
            <Box>
              <Typography
                color="textSecondary"
                sx={{ textTransform: 'uppercase' }}
                variant="subtitle1"
              >
                Reset Password
              </Typography>
              <Typography
                color="textPrimary"
                variant="body2"
              >
                Forgot your password?
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="white"
              component={Link}
              href="/password-recovery"
              variant="text"
            >
              Reset Password
            </Button>
          </Box>
        </Card>
      </AccountSecurityRoot>
      <EmailChangeDialog
        onClose={() => { setEmailChangeDialogOpen(false); }}
        open={emailChangeDialogOpen}
      />
      <PasswordChangeDialog
        onClose={() => { setPasswordChangeDialogOpen(false); }}
        open={passwordChangeDialogOpen}
      />
    </>
  );
};
