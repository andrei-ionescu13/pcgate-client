'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider } from 'next-intl';
import { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from '../contexts/auth-context';
import { SettingsProvider } from '../contexts/settings-context';
import { StoreProvider } from '../store';
import { createCustomTheme } from '../theme';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        gcTime: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

interface ProvidersProps {
  children: ReactNode;
  user: any;
  currency?: string;
  messages?: any;
  locale?: string;
}

const Providers: FC<ProvidersProps> = (props) => {
  const { children, user, currency, messages, locale } = props;
  const queryClient = getQueryClient();
  const theme = createCustomTheme('dark');

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Europe/Bucharest"
    >
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <GoogleOAuthProvider clientId="750036915548-bdi2e09ms0r0sotdfrb0bi4098156qnr.apps.googleusercontent.com">
          <QueryClientProvider client={queryClient}>
            <StoreProvider>
              <AuthProvider decoded={user}>
                <SettingsProvider currency={currency}>
                  <ThemeProvider theme={theme}>
                    <Toaster richColors />
                    <ReactQueryDevtools initialIsOpen={false} />
                    {children}
                  </ThemeProvider>
                </SettingsProvider>
              </AuthProvider>
            </StoreProvider>
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </AppRouterCacheProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
