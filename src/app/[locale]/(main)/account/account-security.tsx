'use client';

import { Button } from '@/components/button';
import { EmailChangeDialog } from '@/components/email-change-dialog';
import { PasswordChangeDialog } from '@/components/password-change-dialog';
import { useAuth } from '@/contexts/auth-context';
import { Link } from '@/i18n/navigation';
import { Card } from '@mui/material';
import { useState } from 'react';

export const AccountSecurity = () => {
  const { decoded } = useAuth();
  const [emailChangeDialogOpen, setEmailChangeDialogOpen] = useState(false);
  const [passwordChangeDialogOpen, setPasswordChangeDialogOpen] =
    useState(false);

  return (
    <>
      <div>
        <h5 className="mb-3">Account Security</h5>
        <Card
          sx={{
            backgroundColor: 'background.default',
            p: 2,
            '& > div:not(:last-child)': {
              mb: 4,
            },
          }}
        >
          <div className="items-center sm:flex">
            <div>
              <p className="subtitle1 text-text-secondary uppercase">
                Email Addres
              </p>
              <p className="body2">{decoded?.email}</p>
            </div>
            <div className="flex-1" />
            <Button
              onClick={() => {
                setEmailChangeDialogOpen(true);
              }}
            >
              Change Email Address
            </Button>
          </div>
          <div className="items-center sm:flex">
            <div>
              <p className="subtitle1 text-text-secondary uppercase">
                Password
              </p>
            </div>
            <div className="flex-1" />
            <Button
              onClick={() => {
                setPasswordChangeDialogOpen(true);
              }}
            >
              Change Password
            </Button>
          </div>
          <div className="items-center sm:flex">
            <div>
              <p className="subtitle1 text-text-secondary uppercase">
                Reset Password
              </p>
              <p className="body2">Forgot your password?</p>
            </div>
            <div className="flex-1" />
            <Button asChild>
              <Link href="/password-recovery">Reset Password</Link>
            </Button>
          </div>
        </Card>
      </div>
      <EmailChangeDialog
        onClose={() => {
          setEmailChangeDialogOpen(false);
        }}
        open={emailChangeDialogOpen}
      />
      <PasswordChangeDialog
        onClose={() => {
          setPasswordChangeDialogOpen(false);
        }}
        open={passwordChangeDialogOpen}
      />
    </>
  );
};
