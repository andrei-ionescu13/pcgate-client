import { useState } from 'react';
import type { FC } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import type { SxProps } from '@mui/system';
import { LanguageCurrencyDialog } from '../language-currency-dialog';
import { useSettings } from '../../contexts/settings-context';

interface AccountWebsiteSettingsProps {
  sx?: SxProps;
}

const languageLabels = {
  de: 'Deutsch',
  en: 'English',
  es: 'Espaniol',
  fr: 'Français'
};

const currencyLabels = {
  EUR: 'Euro (EUR)',
  USD: 'Dollar (USD)'
};

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
      <Box {...props}>
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
                Site language
              </Typography>
              <Typography
                color="textPrimary"
                variant="body2"
              >
                {languageLabels[settings.language]}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="primary"
              onClick={handleOpenDialog}
              variant="text"
            >
              Change Language
            </Button>
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
                Site currency
              </Typography>
              <Typography
                color="textPrimary"
                variant="body2"
              >
                {currencyLabels[settings.currency]}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="primary"
              onClick={handleOpenDialog}
              variant="text"
            >
              Change Currency
            </Button>
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
              color="primary"
              onClick={handleSwitchTheme}
              variant="text"
            >
              Change Theme
            </Button>
          </Box>
        </Card>
      </Box>
      <LanguageCurrencyDialog
        onClose={() => { setDialogOpen(false); }}
        open={dialogOpen}
      />
    </>
  );
};
