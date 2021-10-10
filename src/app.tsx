import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSettings } from './contexts/settings-context';
import { useAuth } from './contexts/auth-context';
import { routes } from './routes';
import { createCustomTheme } from './theme';

export const App = () => {
  const { isInitialized } = useAuth();
  const routing = useRoutes(routes);
  const { settings } = useSettings();
  const theme = createCustomTheme(settings.theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isInitialized && routing}
    </ThemeProvider>
  );
};
