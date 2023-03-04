import type { FC } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AccountPopover } from './account-popover';
import { Link } from '@/components/link';
import { Logo } from './logo';
import { SearchMobile } from './search-mobile';
import { Search } from './search';
import { Menu as MenuIcon } from '@/icons/menu';
import { SwitchThemeButton } from './switch-theme-button';
import { WishlistLink } from './wishlist-link';
import { CartDropdown } from './cart-dropdown';
import { useAuth } from '@/contexts/auth-context';

interface NavbarPrimaryProps {
  smUp: boolean;
  onOpenSidebar: () => void;
}

export const NavbarPrimary: FC<NavbarPrimaryProps> = (props) => {
  const { isAuthenticated } = useAuth();
  const { smUp, onOpenSidebar } = props;
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: {
              xs: 56
            }
          }}
        >
          <Link
            href="/"
            sx={{
              display: {
                sm: 'block',
                xs: 'none'
              }
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Logo
                sx={{
                  height: 33,
                  width: 166,
                }}
              />
            </Box>
          </Link>
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              color: '#fff',
              display: {
                sm: 'none'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Search
            sx={{
              display: {
                md: 'flex',
                xs: 'none'
              },
              width: '100%',
              maxWidth: 600,
              ml: 5,
              mr: 2
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: 'flex',
              gap: 1.5
            }}
          >
            {!mdUp && <SearchMobile />}
            {smUp && isAuthenticated ? (
              <>
                <AccountPopover />
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/register"
                  variant="outlined"
                  color="white"
                >
                  Register
                </Button>
                <Button
                  component={Link}
                  href="/login"
                  color="primary"
                  variant="contained"
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};