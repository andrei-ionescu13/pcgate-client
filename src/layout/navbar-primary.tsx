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
            className="hidden sm:inline"
          >
            <div className="flex">
              <Logo />
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
          <div className="mr-4 ml-10 hidden w-full max-w-sm md:block">
            <SearchProducts />
          </div>
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
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </div>
  );
};
