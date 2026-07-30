import { useSettings } from '@/contexts/settings-context';

export const useAmountFormatter = () => {
  const { settings } = useSettings();
  const { currency, language } = settings;

  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format;
};
