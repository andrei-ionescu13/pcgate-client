import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Box,
  Container,
  Toolbar,
  List,
  useMediaQuery,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CartDropdown } from './cart-dropdown';
import { NavLink } from '../components/nav-link';
import { WishlistLink } from './wishlist-link';
import { useAuth } from '@/contexts/auth-context';

interface LinkI {
  href: string;
  translation: string;
}

const links: LinkI[] = [
  {
    href: '/games',
    translation: 'navbar.store'
  },
  {
    href: '/bundles',
    translation: 'navbar.bundles'
  },
  {
    href: '/blog',
    translation: 'navbar.blog'
  }
];

export const NavbarSecondary: FC = () => {
  const { t } = useTranslation('common');
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

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
                underline="none"
                color="textPrimary"
                href={link.href}
                key={link.href}
                sx={{ mr: 2 }}
                activeStyles={{
                  color: 'primary.main'
                }}
              >
                {t(link.translation)}
              </NavLink>
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          {(smUp && isAuthenticated) && (
            <Box
              sx={{
                display: 'flex',
                gap: 1.5
              }}
            >
              <WishlistLink />
              <CartDropdown />
            </Box>)}
        </Toolbar>
      </Container>
    </Box>
  );
};