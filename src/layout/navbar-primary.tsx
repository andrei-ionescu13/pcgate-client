'use client';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { IconButton } from '@/components/icon-button';
import { useAuth } from '@/contexts/auth-context';
import { Link } from '@/i18n/navigation';
import { Menu as MenuIcon } from '@/icons/menu';
import type { FC } from 'react';
import { AccountPopover } from './account-popover';
import { Logo } from './logo';
import { SearchMobile } from './search-mobile';
import { SearchProducts } from './search-products';

interface NavbarPrimaryProps {
  onOpenSidebar: () => void;
}

export const NavbarPrimary: FC<NavbarPrimaryProps> = (props) => {
  const { isAuthenticated } = useAuth();
  const { onOpenSidebar } = props;

  return (
    <div>
      <Container maxWidth="lg">
        <div className="flex h-14 items-center">
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
            className="sm:hidden"
          >
            <MenuIcon />
          </IconButton>
          <div className="mr-4 ml-10 hidden w-full max-w-sm md:block">
            <SearchProducts />
          </div>
          <div className="flex-1" />
          <div className="flex gap-3">
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
        </div>
      </Container>
    </div>
  );
};
