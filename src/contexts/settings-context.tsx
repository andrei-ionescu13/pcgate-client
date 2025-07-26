'use client';
import { appFetchAuth } from '@/utils/app-fetch';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export interface Currency {
  name: string;
  code: string;
  symbol: string;
}

export interface Language {
  name: string;
  code: string;
  nativeName: string;
}

export const listLanguages = () =>
  appFetchAuth<Language[]>({
    url: '/languages',
  });

const listCurrencies = () =>
  appFetchAuth<Currency[]>({
    url: '/currencies',
  });

interface Settings {
  currency: string;
  language: string;
  theme: string;
}

export interface SettingsContextValue {
  settings: Settings;
  saveSettings: (update: Settings) => void;
  currencies: Currency[] | undefined;
  languages: Language[] | undefined;
}

interface SettingsProviderProps {
  children?: ReactNode;
  currency?: string;
}

const initialSettings: Settings = {
  currency: '',
  language: '',
  theme: 'light',
};

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => {},
  currencies:
    typeof window !== 'undefined' &&
    (localStorage.getItem('languages')
      ? JSON.parse(localStorage.getItem('languages') as string)
      : []),
  languages:
    typeof window !== 'undefined' &&
    (localStorage.getItem('currencies')
      ? JSON.parse(localStorage.getItem('currencies') as string)
      : []),
});

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const { children, currency } = props;
  const queryClient = useQueryClient();
  const language = useLocale();
  const [settings, setSettings] = useState<Settings>({
    ...initialSettings,
    language: language,
    currency: currency || 'USD',
  });

  const { data: languages } = useQuery<Language[]>({
    queryKey: ['languages'],
    queryFn: listLanguages,
  });
  const { data: currencies } = useQuery<Currency[]>({
    queryKey: ['currencies'],
    queryFn: listCurrencies,
  });

  const saveSettings = (updatedSettings: Settings): void => {
    setSettings(updatedSettings);
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['products'],
      refetchType: 'active',
    });
    queryClient.invalidateQueries({
      queryKey: ['cart'],
      refetchType: 'active',
    });
  }, [settings.currency]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
        currencies,
        languages,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export const useSettings = () => useContext(SettingsContext);
