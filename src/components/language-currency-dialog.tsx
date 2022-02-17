import { useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
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
  Typography
} from '@mui/material';
import { useSettings } from '../contexts/settings-context';

type Language = 'en' | 'de' | 'es' | 'fr';

type Currency = 'EUR' | 'USD';

interface LanguageOption {
  label: 'English' | 'Deutsch' | 'Espaniol' | 'Français';
  value: 'en' | 'de' | 'es' | 'fr';
}

interface CurrencyOption {
  value: Currency;
  label: string;
}

const languageOptions: LanguageOption[] = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'Deutsch',
    value: 'de'
  },
  {
    label: 'Espaniol',
    value: 'es'
  },
  {
    label: 'Français',
    value: 'fr'
  }
];

const currencyOptions: CurrencyOption[] = [
  {
    value: 'EUR',
    label: 'Euro (EUR)'
  },
  {
    value: 'USD',
    label: 'Dollar (USD)'
  }
];

interface LanguageCurrencyDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LanguageCurrencyDialog: FC<LanguageCurrencyDialogProps> = (props) => {
  const { open, onClose } = props;
  const { settings, saveSettings } = useSettings();
  const [language, setLanguage] = useState(settings.language);
  const [currency, setCurrency] = useState(settings.currency);

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLanguage(event.target.value as Language);
  };

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrency(event.target.value as Currency);
  };

  const handleSaveSettings = () => {
    saveSettings({
      ...settings,
      language,
      currency
    });
    onClose();
  };

  useEffect(() => {
    setLanguage(settings.language);
    setCurrency(settings.currency);
  }, [settings]);

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        Language and Currency
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography
          color="textPrimary"
          variant="subtitle1"
        >
          Language
        </Typography>
        <RadioGroup
          onChange={handleLanguageChange}
          value={language}
        >
          <Grid container>
            {languageOptions.map((option) => (
              <Grid
                item
                key={option.value}
                sm={4}
                xs={6}
              >
                <FormControlLabel
                  componentsProps={{
                    typography: {
                      variant: 'body2'
                    }
                  }}
                  control={<Radio color="primary" />}
                  label={option.label}
                  value={option.value}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
        <Typography
          color="textPrimary"
          sx={{ mt: 2.5 }}
          variant="subtitle1"
        >
          Currency
        </Typography>
        <RadioGroup
          onChange={handleCurrencyChange}
          value={currency}
        >
          <Grid container>
            {currencyOptions.map((option) => (
              <Grid
                item
                key={option.value}
                sm={4}
                xs={6}
              >
                <FormControlLabel
                  componentsProps={{
                    typography: {
                      variant: 'body2'
                    }
                  }}
                  control={<Radio color="primary" />}
                  label={option.label}
                  value={option.value}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
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
