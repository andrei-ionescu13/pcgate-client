import { Link } from '@/i18n/navigation';
import { X } from '@/icons/x';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
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
          <Logo sx={{ width: 56 }} />
          <div className="flex-1" />
          <IconButton
            size="small"
            onClick={() => onClose()}
          >
            <X fontSize="small" />
          </IconButton>
        </div>
        <List disablePadding>
          {links.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              sx={{ py: 0.5 }}
              onClick={() => {
                onClose();
              }}
            >
              <ListItemText
                primary={link.translation}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Drawer>
  );
};
