'use client';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { useAuth } from '@/contexts/auth-context';
import { Link } from '@/i18n/navigation';
import { Menu as MenuIcon } from '@/icons/menu';
import { IconButton, Toolbar } from '@mui/material';
import type { FC } from 'react';
import { AccountPopover } from './account-popover';
import { Logo } from './logo';
import { SearchMobile } from './search-mobile';
import { SearchProducts } from './search-poducts';

interface NavbarPrimaryProps {
  onOpenSidebar: () => void;
}

export const NavbarPrimary: FC<NavbarPrimaryProps> = (props) => {
  const { isAuthenticated } = useAuth();
  const { onOpenSidebar } = props;

  return (
    <div>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: {
              xs: 56,
            },
          }}
        >
          <Link
            href="/"
            sx={{
              display: {
                sm: 'block',
                xs: 'none',
              },
            }}
          >
            <div className="flex">
              <Logo
                sx={{
                  height: 33,
                  width: 166,
                }}
              />
            </div>
          </Link>
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              color: '#fff',
              display: {
                sm: 'none',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <SearchProducts
            sx={{
              display: {
                md: 'flex',
                xs: 'none',
              },
              width: '100%',
              maxWidth: 600,
              ml: 5,
              mr: 2,
            }}
          />
          <div className="flex-1" />
          <div className="flex gap-3">
            {/* todo change this */}
            <div className="md:hidden">
              <SearchMobile />
            </div>
            {isAuthenticated ? (
              <>
                <AccountPopover />
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="outlined"
                >
                  <Link href="/register">Register</Link>
                </Button>
                <Button
                  asChild
                  color="primary"
                  variant="contained"
                >
                  <Link href="/login">Login</Link>
                </Button>
                {/* <Button
                  component={Link}
                  href="/login"
                  color="primary"
                  variant="contained"
                >
                  Login
                </Button> */}
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </div>
  );
};
