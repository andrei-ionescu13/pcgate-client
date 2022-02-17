import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AccountPopover } from './account-popover';
import { CartDropdown } from './cart-dropdown';
import { Logo } from './logo';
import { MobileSearch } from './mobile-search';
import { Search } from './search';
import { SwitchThemeButton } from './switch-theme-button';
import { WishlistLink } from './wishlist-link';
import { Menu as MenuIcon } from '../icons/menu';

interface NavbarPrimaryProps {
  isAuthenticated: boolean;
  smUp: boolean;
  onOpenSidebar: () => void;
}

export const NavbarPrimary: FC<NavbarPrimaryProps> = (props) => {
  const { isAuthenticated, smUp, onOpenSidebar } = props;
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
            component={RouterLink}
            to="/"
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
          {!mdUp && <MobileSearch />}
          {!smUp && (
            <>
              <SwitchThemeButton />
              {isAuthenticated && (
                <>
                  <WishlistLink />
                  <CartDropdown />
                </>
              )}
            </>
          )}
          {smUp && (
            isAuthenticated ? <AccountPopover /> : (
              <>
                <Button
                  component={RouterLink}
                  sx={{
                    borderColor: '#fff',
                    color: '#fff',
                    mr: 1.5,

                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000'
                    }
                  }}
                  to="/register"
                  variant="outlined"
                >
                  Register
                </Button>
                <Button
                  sx={{
                    backgroundColor: '#fff',
                    color: '#000',

                    '&:hover': {
                      backgroundColor: '#fff'
                    }
                  }}
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                >
                  Login
                </Button>
              </>
            ))}
        </Toolbar>
      </Container>
    </Box>
  );
};