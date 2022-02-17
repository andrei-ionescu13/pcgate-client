import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useSettings } from './contexts/settings-context';
import { useAuth } from './contexts/auth-context';
import { routes } from './routes';
import { createCustomTheme } from './theme';

const queryClient = new QueryClient();

export const App = () => {
  const { isInitialized } = useAuth();
  const location = useLocation();
  const routing = useRoutes(routes);
  const { settings } = useSettings();
  const theme = createCustomTheme(settings.theme);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isInitialized && routing}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};
