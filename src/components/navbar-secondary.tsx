import type { FC } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import {
  Box,
  Container,
  Toolbar,
  List,
} from '@material-ui/core';
import { CartDropdown } from './cart-dropdown';
import { NavLink } from './nav-link';
import { SwitchThemeButton } from './switch-theme-button';
import { WishlistLink } from './wishlist-link';

interface NavbarSecondaryProps {
  isAuthenticated: boolean;
}

const links = [
  {
    href: '/search',
    title: 'Store'
  },
  {
    href: '/bundles',
    title: 'Bundles'
  }
];

export const NavbarSecondary: FC<NavbarSecondaryProps> = (props) => {
  const { isAuthenticated } = props;
  const { pathname } = useLocation();

  return (
    <Box>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            alignItems: 'center',
            color: '#fff',
            display: 'flex',
            minHeight: {
              xs: 56
            }
          }}
        >
          <List
            disablePadding
            sx={{
              display: 'flex',
              position: 'static'
            }}
          >
            {links.map((link) => (
              <NavLink
                active={Boolean(matchPath({ path: link.href, end: true }, pathname))}
                href={link.href}
                key={link.href}
                title={link.title}
                sx={{ mr: 2 }}
              />
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <SwitchThemeButton />
          {isAuthenticated && (
            <>
              <WishlistLink />
              <CartDropdown />
            </>
          )}
        </Toolbar>
      </Container>
    </Box>
  );
};