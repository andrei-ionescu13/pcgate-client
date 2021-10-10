import { useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography } from '@material-ui/core';
import type { SxProps } from '@material-ui/system';
import { EmailChangeDialog } from '../email-change-dialog';
import { PasswordChangeDialog } from '../password-change-dialog';
import { useAuth } from '../../contexts/auth-context';

interface AccountSecurityProps {
  sx?: SxProps;
}

export const AccountSecurity: FC<AccountSecurityProps> = (props) => {
  const { user } = useAuth();
  const [emailChangeDialogOpen, setEmailChangeDialogOpen] = useState(false);
  const [passwordChangeDialogOpen, setPasswordChangeDialogOpen] = useState(false);
  console.log(user);
  return (
    <>
      <Box {...props}>
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
          variant="outlined"
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
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
                {user?.email}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              color="primary"
              onClick={() => { setEmailChangeDialogOpen(true); }}
              sx={{ cursor: 'pointer' }}
              variant="body1"
            >
              Change Email Address
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
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
            <Typography
              color="primary"
              onClick={() => { setPasswordChangeDialogOpen(true); }}
              sx={{ cursor: 'pointer' }}
              variant="body1"
            >
              Change Password
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
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
            <Link
              color="primary"
              component={RouterLink}
              to="/password-recovery"
              underline="none"
              variant="body1"
            >
              Reset Password
            </Link>
          </Box>
        </Card>
      </Box>
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
