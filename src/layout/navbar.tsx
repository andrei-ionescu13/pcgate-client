import type { FC } from 'react';
import { AppBar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NavbarPrimary } from './navbar-primary';
import { NavbarSecondary } from './navbar-secondary';

interface NavbarProps {
  onOpenSidebar: () => void;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { onOpenSidebar } = props;
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AppBar
      sx={{
        backgroundColor: '#12171E',
        backgroundImage: 'initial'
      }}
    >
      <NavbarPrimary
        smUp={true}
        onOpenSidebar={onOpenSidebar}
      />
      {smUp && <NavbarSecondary />}
    </AppBar>
  );
};
