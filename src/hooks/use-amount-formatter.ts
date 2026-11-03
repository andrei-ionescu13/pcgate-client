import { useSettings } from '@/contexts/settings-context';

export const useAmountFormatter = (currency?: string) => {
  const { settings } = useSettings();
  const { currency: appCurrency, language } = settings;

  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currency || appCurrency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format;
};
