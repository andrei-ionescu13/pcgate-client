import type { FC } from 'react';
import { AppBar, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { NavbarPrimary } from './navbar-primary';
import { NavbarSecondary } from './navbar-secondary';
import { useAuth } from '../contexts/auth-context';

interface NavbarProps {
  onOpenSidebar: () => void;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { onOpenSidebar } = props;
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AppBar
      sx={{
        backgroundColor: '#0B182D',
        backgroundImage: 'initial'
      }}
    >
      <NavbarPrimary
        isAuthenticated={isAuthenticated}
        smUp={smUp}
        onOpenSidebar={onOpenSidebar}
      />
      {smUp && <NavbarSecondary isAuthenticated={isAuthenticated} />}
    </AppBar>
  );
};
