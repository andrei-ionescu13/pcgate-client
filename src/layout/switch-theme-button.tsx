import type { FC } from 'react';
import { IconButton } from '@mui/material';
import { Moon as MoonIcon } from '@/icons/moon';
import { Sun as SunIcon } from '@/icons/sun';
import { useSettings } from '@/contexts/settings-context';

export const SwitchThemeButton: FC = () => {
  const { settings, saveSettings } = useSettings();

  const handleSwitchTheme = () => {
    saveSettings({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light'
    });
  };

  return (
    <IconButton
      sx={{ color: '#fff' }}
      onClick={handleSwitchTheme}
    >
      {settings.theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};
