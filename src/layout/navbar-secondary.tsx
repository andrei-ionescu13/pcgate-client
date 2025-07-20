import { Container } from '@/components/container';
import { useAuth } from '@/contexts/auth-context';
import { List } from '@mui/material';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { NavLink } from '../components/nav-link';
import { CartDropdown } from './cart-dropdown';
import { WishlistLink } from './wishlist-link';

interface LinkI {
  href: string;
  translation: string;
}

const links: LinkI[] = [
  {
    href: '/products',
    translation: 'navbar_store',
  },
  {
    href: '/bundles',
    translation: 'navbar_bundles',
  },
  {
    href: '/blog',
    translation: 'navbar_blog',
  },
];

export const NavbarSecondary: FC = () => {
  const { isAuthenticated } = useAuth();
  const t = useTranslations('general');

  return (
    <div className="hidden sm:block">
      <Container maxWidth="lg">
        <div className="flex h-14 items-center text-white">
          <List
            disablePadding
            sx={{
              display: 'flex',
              position: 'static',
            }}
          >
            {links.map((link) => (
              <NavLink
                href={link.href}
                key={link.href}
                className="hover:text-primary mr-2"
                activeClassName="text-primary"
              >
                {t(link.translation)}
              </NavLink>
            ))}
          </List>
          <div className="flex-1" />
          {isAuthenticated && (
            <div className="flex gap-3">
              <WishlistLink />
              <CartDropdown />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
