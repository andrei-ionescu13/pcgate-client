import { useState } from 'react';
import type { FC } from 'react';
import { Box, Card, Typography } from '@material-ui/core';
import type { SxProps } from '@material-ui/system';
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
            <Typography
              color="primary"
              onClick={handleOpenDialog}
              sx={{ cursor: 'pointer' }}
              variant="body1"
            >
              Change Language
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
            <Typography
              color="primary"
              onClick={handleOpenDialog}
              sx={{ cursor: 'pointer' }}
              variant="body1"
            >
              Change Currency
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
            <Typography
              color="primary"
              onClick={handleSwitchTheme}
              sx={{ cursor: 'pointer' }}
              variant="body1"
            >
              Change Theme
            </Typography>
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
