import { IconButton } from '@/components/icon-button';
import { useSettings } from '@/contexts/settings-context';
import { Moon as MoonIcon } from '@/icons/moon';
import { Sun as SunIcon } from '@/icons/sun';
import type { FC } from 'react';

export const SwitchThemeButton: FC = () => {
  const { settings, saveSettings } = useSettings();

  const handleSwitchTheme = () => {
    saveSettings({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light',
    });
  };

  return (
    <IconButton onClick={handleSwitchTheme}>
      {settings.theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};
