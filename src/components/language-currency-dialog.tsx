import { useSettings } from '@/contexts/settings-context';
import { usePathname, useRouter } from '@/i18n/navigation';
import { MenuItem, TextField } from '@mui/material';
import { setCookie } from 'cookies-next';
import { useParams, useSearchParams } from 'next/navigation';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState, useTransition } from 'react';
import { DialogAlert } from './dialog-alert';

const NEXT_LOCALE = 'NEXT_LOCALE';

interface LanguageCurrencyDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LanguageCurrencyDialog: FC<LanguageCurrencyDialogProps> = (
  props
) => {
  const { open, onClose } = props;
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [refreshTriggered, setRefreshTriggered] = useState(false);

  const query: any = {};
  const searchParams = useSearchParams();

  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }
  const { settings, saveSettings, currencies, languages } = useSettings();
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(
    settings.language
  );
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(
    settings?.currency
  );

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguageCode(event.target.value);
  };

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrencyCode(event.target.value);
  };

  const handleSaveSettings = () => {
    setCookie('currency', selectedCurrencyCode);
    setCookie(NEXT_LOCALE, selectedLanguageCode);

    router.replace(pathname, { locale: selectedLanguageCode });

    setRefreshTriggered(true);
    startTransition(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    if (refreshTriggered && !isPending) {
      saveSettings({
        ...settings,
        language: selectedLanguageCode,
        currency: selectedCurrencyCode,
      });

      onClose();
      setRefreshTriggered(false);
    }
  }, [isPending, refreshTriggered, onClose]);

  return (
    <DialogAlert
      fullWidth
      onClose={onClose}
      open={open}
      disableRestoreFocus
      title="Language and Currency"
      onSubmit={handleSaveSettings}
      isLoading={isPending}
    >
      <div className="flex flex-col gap-6">
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
      </div>
    </DialogAlert>
  );
};
