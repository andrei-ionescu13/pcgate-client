"use client"

import { useSettings } from "@/contexts/settings-context";
import { useParams } from "next/navigation";
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

export const useFormatCurrency = () => {
  const { settings } = useSettings();
  const { locale } = useParams();

  const options = {
    style: 'currency',
    currency: settings.currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }

  return new Intl.NumberFormat(locale, options).format;
}