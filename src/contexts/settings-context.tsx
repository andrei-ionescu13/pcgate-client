import { createContext, useContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

type Currency = 'EUR' | 'USD';

type CurrencySymbol = '€' | '$';

interface Settings {
  currency: Currency;
  currencySymbol: CurrencySymbol;
  language: 'en' | 'de' | 'es' | 'fr';
  theme: string;
}

export interface SettingsContextValue {
  settings: Settings;
  saveSettings: (update: Settings) => void;
}

interface SettingsProviderProps {
  children?: ReactNode;
}

const currencySymbols: Record<Currency, CurrencySymbol> = {
  EUR: '€',
  USD: '$'
};

const initialSettings: Settings = {
  currency: 'EUR',
  currencySymbol: '€',
  language: 'en',
  theme: 'light'
};

export const restoreSettings = (): Settings | null => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = {
        currency: 'EUR',
        currencySymbol: '€',
        language: 'en',
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      };
    }
  } catch (err) {
    console.error(err);
  }

  return settings;
};

export const storeSettings = (settings: Settings): void => {
  window.localStorage.setItem('settings', JSON.stringify(settings));
};

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => { }
});

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useState<Settings>(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings: Settings): void => {
    setSettings({
      ...updatedSettings,
      currencySymbol: currencySymbols[updatedSettings.currency]
    });
    storeSettings({
      ...updatedSettings,
      currencySymbol: currencySymbols[updatedSettings.currency]
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export const useSettings = () => useContext(SettingsContext);
