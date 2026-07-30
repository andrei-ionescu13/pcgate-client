'use client';

import { ListButton } from '@/components/dropdown-button';
import { IconButton } from '@/components/icon-button';
import { Link } from '@/i18n/navigation';
import { useLayout } from '@/store/layout';
import { Drawer, List } from '@mui/material';
import { XIcon } from 'lucide-react';
import { Logo } from './logo';

interface LinkI {
  href: string;
  translation: string;
}

const links: LinkI[] = [
  {
    href: '/products',
    translation: 'navbar.store',
  },
  {
    href: '/bundles',
    translation: 'navbar.bundles',
  },
  {
    href: '/blog',
    translation: 'navbar.blog',
  },
];

export const MobileSidebar = () => {
  const { openSidebar, handleCloseSidebar } = useLayout();

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
        },
      }}
      onClose={() => {
        handleCloseSidebar();
      }}
      open={openSidebar}
    >
      <div>
        <div className="bg-default flex min-h-14 items-center px-4">
          <Logo className="w-16" />
          <div className="flex-1" />
          <IconButton onClick={() => handleCloseSidebar()}>
            <XIcon />
          </IconButton>
        </div>
        <List disablePadding>
          {links.map((link) => (
            <ListButton
              key={link.href}
              onClick={() => {
                handleCloseSidebar();
              }}
            >
              <Link href={link.href}>{link.translation}</Link>
            </ListButton>
          ))}
        </List>
      </div>
    </Drawer>
  );
};
