'use client';

import { LanguageCurrencyDialog } from '@/components/language-currency-dialog';
import { useSettings } from '@/contexts/settings-context';
import { Button, Card } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';

interface AccountWebsiteSettingsProps {}

export const AccountWebsiteSettings: FC<AccountWebsiteSettingsProps> = (
  props
) => {
  const { settings, saveSettings } = useSettings();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setDialogOpen(true);
  };

  const handleSwitchTheme = () => {
    saveSettings({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light',
    });
  };

  return (
    <>
      <div {...props}>
        <h5 className="mb-3">Website Settings</h5>
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
                Site language
              </p>
              <p className="body2">Change this</p>
            </div>
            <div className="flex-1" />
            <Button
              color="white"
              onClick={handleOpenDialog}
              variant="text"
            >
              Change Language
            </Button>
          </div>
          <div className="items-center sm:flex">
            <div>
              <p className="subtitle1 text-text-secondary uppercase">
                Site currency
              </p>
              <p className="body2">{settings.currency}</p>
            </div>
            <div className="flex-1" />
            <Button
              color="white"
              onClick={handleOpenDialog}
              variant="text"
            >
              Change Currency
            </Button>
          </div>
          <div className="items-center sm:flex">
            <div>
              <p className="subtitle1 text-text-secondary uppercase">
                Site theme
              </p>
              <p className="body2">
                {settings.theme === 'light' ? 'Light' : 'Dark'} Theme
              </p>
            </div>
            <div className="flex-1" />
            <Button
              color="white"
              onClick={handleSwitchTheme}
              variant="text"
            >
              Change Theme
            </Button>
          </div>
        </Card>
      </div>
      <LanguageCurrencyDialog
        onClose={() => {
          setDialogOpen(false);
        }}
        open={dialogOpen}
      />
    </>
  );
};
