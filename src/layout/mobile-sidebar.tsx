import { ListButton } from '@/components/dropdown-button';
import { IconButton } from '@/components/icon-button';
import { Link } from '@/i18n/navigation';
import { X } from '@/icons/x';
import { Drawer, List } from '@mui/material';
import type { FC } from 'react';
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

interface MobileSidebarProps {
  onClose: () => void;
  open: boolean;
}

export const MobileSidebar: FC<MobileSidebarProps> = (props) => {
  const { open, onClose } = props;

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
        onClose();
      }}
      open={open}
    >
      <div>
        <div className="bg-default flex min-h-14 items-center px-4">
          <Logo className="w-16" />
          <div className="flex-1" />
          <IconButton onClick={() => onClose()}>
            <X />
          </IconButton>
        </div>
        <List disablePadding>
          {links.map((link) => (
            <ListButton
              key={link.href}
              onClick={() => {
                onClose();
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
