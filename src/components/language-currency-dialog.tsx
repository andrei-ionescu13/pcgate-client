import { useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
import { useRouter } from 'next/router'
import { getCookie, setCookie } from 'cookies-next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  Typography,
  TextField,
  MenuItem
} from '@mui/material';
import { useSettings } from '@/contexts/settings-context';
import { useTranslation } from 'next-i18next';
const NEXT_LOCALE = "NEXT_LOCALE";

interface LanguageCurrencyDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LanguageCurrencyDialog: FC<LanguageCurrencyDialogProps> = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const { i18n } = useTranslation();
  const { pathname, asPath, query } = router
  const { settings, saveSettings, currencies, languages } = useSettings();
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(i18n.language);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(settings?.currency);

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguageCode(event.target.value);
  };

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrencyCode(event.target.value);
  };

  const handleSaveSettings = async () => {
    setCookie('preferredCurrency', selectedCurrencyCode)
    setCookie(NEXT_LOCALE, selectedLanguageCode)

    await router.replace({ pathname, query }, asPath, { locale: selectedLanguageCode })
    saveSettings({
      ...settings,
      language: selectedLanguageCode,
      currency: selectedCurrencyCode
    });
    onClose();
  };

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      disableRestoreFocus
    >
      <DialogTitle>
        Language and Currency
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <TextField
              select
              id="language"
              name="language"
              label="Language"
              value={selectedLanguageCode}
              fullWidth
              size="small"
              onChange={handleLanguageChange}
              variant="filled"
            >
              {languages?.map((option) => (
                <MenuItem
                  key={option.code}
                  value={option.code}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              select
              id="currency"
              name="currency"
              label="Currency"
              value={selectedCurrencyCode}
              fullWidth
              size="small"
              onChange={handleCurrencyChange}
              variant="filled"
            >
              {currencies?.map((option) => (
                <MenuItem
                  key={option.code}
                  value={option.code}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="white"
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSaveSettings}
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};
