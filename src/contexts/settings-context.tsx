import { createContext, useContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { appFetch } from "@/utils/app-fetch";
import { getCookie } from "cookies-next";
import { useTranslation } from "next-i18next";

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

const listLanguages = () =>
  appFetch<Language[]>({
    url: "/languages",
  });

const listCurrencies = () =>
  appFetch<Currency[]>({
    url: "/currencies",
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
}

const initialSettings: Settings = {
  currency: "",
  language: "",
  theme: "light",
};

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => {},
  currencies:
    typeof window !== "undefined" &&
    (localStorage.getItem("languages")
      ? JSON.parse(localStorage.getItem("languages") as string)
      : []),
  languages:
    typeof window !== "undefined" &&
    (localStorage.getItem("currencies")
      ? JSON.parse(localStorage.getItem("currencies") as string)
      : []),
});

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const { children } = props;
  const { i18n } = useTranslation();
  const [settings, setSettings] = useState<Settings>({
    ...initialSettings,
    language: i18n.language,
    currency: (getCookie("preferredCurrency") as string) || "USD",
  });
  const { data: languages } = useQuery<Language[]>(
    ["languages"],
    listLanguages
  );
  const { data: currencies } = useQuery<Currency[]>(
    ["currencies"],
    listCurrencies
  );

  const saveSettings = (updatedSettings: Settings): void => {
    setSettings(updatedSettings);
  };

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
