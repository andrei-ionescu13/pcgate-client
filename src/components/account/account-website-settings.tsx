"use client"

import { useState } from 'react';
import type { FC } from 'react';
import { Box, Button, Card, Typography, styled } from '@mui/material';
import { BoxProps } from '@mui/material';
import type { SxProps } from '@mui/system';
import { LanguageCurrencyDialog } from '@/components/language-currency-dialog';
import { useSettings } from '@/contexts/settings-context';

const AccountWebsiteSettingsRoot = styled(Box)(({ }) => ({}))

interface AccountWebsiteSettingsProps extends BoxProps { }

export const AccountWebsiteSettings: FC<AccountWebsiteSettingsProps> = (props) => {
  const { settings, saveSettings } = useSettings();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setDialogOpen(true);
  };

  const handleSwitchTheme = () => {
    saveSettings({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light'
    });
  };

  return (
    <>
      <AccountWebsiteSettingsRoot {...props}>
        <Typography
          color="textPrimary"
          sx={{ mb: 2 }}
          variant="h5"
        >
          Website Settings
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
                Site language
              </Typography>
              <Typography
                color="textPrimary"
                variant="body2"
              >
                Change this
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="white"
              onClick={handleOpenDialog}
              variant="text"
            >
              Change Language
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
                Site currency
              </Typography>
              <Typography
                color="textPrimary"
                variant="body2"
              >
                {settings.currency?.name}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="white"
              onClick={handleOpenDialog}
              variant="text"
            >
              Change Currency
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
                Site theme
              </Typography>
              <Typography
                color="textPrimary"
                variant="body2"
              >
                {settings.theme === 'light' ? 'Light' : 'Dark'}
                {' '}
                Theme
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="white"
              onClick={handleSwitchTheme}
              variant="text"
            >
              Change Theme
            </Button>
          </Box>
        </Card>
      </AccountWebsiteSettingsRoot>
      <LanguageCurrencyDialog
        onClose={() => { setDialogOpen(false); }}
        open={dialogOpen}
      />
    </>
  );
};
