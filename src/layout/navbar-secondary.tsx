import { Badge } from '@/components/badge';
import { Container } from '@/components/container';
import { useAuth } from '@/contexts/auth-context';
import { ShoppingCart as ShoppingCartIcon } from '@/icons/shopping-cart';
import { useStoreSelector } from '@/store/use-store-selector';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { NavLink } from '../components/nav-link';
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

interface NavbarSecondaryProps {
  onOpenCartDrawer: () => void;
}

export const NavbarSecondary: FC<NavbarSecondaryProps> = (props) => {
  const { onOpenCartDrawer } = props;
  const cart = useStoreSelector((state) => state.cart);
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
              <Badge content={cart.itemCount}>
                <button
                  className="flex cursor-pointer items-center rounded-lg bg-[#1E4582] p-2 text-[#FFF]"
                  onClick={onOpenCartDrawer}
                >
                  <ShoppingCartIcon />
                </button>
              </Badge>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
