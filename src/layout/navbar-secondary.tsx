import { Container } from '@/components/container';
import { useAuth } from '@/contexts/auth-context';
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
          <ul className="static flex">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  className="hover:text-primary mr-2"
                  activeClassName="text-primary"
                >
                  {t(link.translation)}
                </NavLink>
              </li>
            ))}
          </ul>
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
