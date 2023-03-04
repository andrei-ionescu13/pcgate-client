import type { FC } from 'react';
import { Box, IconButton, Drawer, DrawerProps, List, ListItemButton, ListItemText, Theme, useMediaQuery } from '@mui/material';
import { Link } from '@/components/link';
import { useTranslation } from 'next-i18next';
import { Logo } from './logo';
import { X } from '@/icons/x';

interface LinkI {
  href: string;
  translation: string;
}

const links: LinkI[] = [
  {
    href: '/games',
    translation: 'navbar.store'
  },
  {
    href: '/bundles',
    translation: 'navbar.bundles'
  },
  {
    href: '/blog',
    translation: 'navbar.blog'
  }
];

interface MobileSidebarProps {
  onClose: () => void;
  open: boolean;
}

export const MobileSidebar: FC<MobileSidebarProps> = (props) => {
  const { open, onClose } = props;
  const { t } = useTranslation('common');

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
        }
      }}
      onClose={() => { onClose() }}
      open={open}
    >
      <Box>
        <Box
          sx={{
            minHeight: 56,
            backgroundColor: 'background.default',
            px: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Logo sx={{ width: 56 }} />
          <Box sx={{ flex: 1 }} />
          <IconButton
            size="small"
            onClick={() => onClose()}
          >
            <X fontSize="small" />
          </IconButton>
        </Box>
        <List disablePadding>
          {links.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              sx={{ py: 0.5 }}
              onClick={() => { onClose() }}
            >
              <ListItemText
                primary={t(link.translation)}
                primaryTypographyProps={{
                  variant: 'body2'
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}