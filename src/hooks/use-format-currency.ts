import { useSettings } from "@/contexts/settings-context";
import { useRouter } from "next/router";

interface ResolvedNumberFormatOptions {
  locale: string;
  numberingSystem: string;
  style: string;
  minimumIntegerDigits: number;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
  useGrouping: boolean;
}

export const useFormatCurrency = (options?: ResolvedNumberFormatOptions) => {
  const { settings } = useSettings();
  const { locale } = useRouter();

  const baseOptions = {
    style: 'currency',
    currency: settings.currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }

  return new Intl.NumberFormat(locale, { ...baseOptions, ...options }).format;
}