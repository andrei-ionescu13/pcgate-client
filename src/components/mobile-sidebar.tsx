import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Button, Collapse, Drawer, IconButton, List, ListItemButton, ListItemText } from '@material-ui/core';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { ChevronUp as ChevronUpIcon } from '../icons/chevron-up';
import { X as XIcon } from '../icons/x';
import { useAuth } from '../contexts/auth-context';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface MobileSidebarItemProps {
  href?: string;
  title: string;
  items?: Array<{ title: string; href: string; }>;
}

const MobileSidebarItem: FC<MobileSidebarItemProps> = (props) => {
  const { href, title, items } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  if (items) {
    return (
      <>
        <ListItemButton onClick={handleToggle}>
          <ListItemText primary={title} />
          {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </ListItemButton>
        <Collapse
          in={open}
          unmountOnExit
        >
          <List disablePadding>
            {items.map((item) => (
              <ListItemButton
                component={RouterLink}
                key={item.title}
                to={item.href}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    // @ts-ignore
    <ListItemButton
      component={RouterLink}
      to={href}
    >
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

export const MobileSidebar: FC<SidebarProps> = (props) => {
  const { onClose, open } = props;
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const items = [
    ...(isAuthenticated ? [{
      title: 'Account',
      items: [
        {
          title: 'Settings',
          href: '/account'
        },
        {
          title: 'Orders',
          href: '/orders'
        }
      ]
    }] : []),
    {
      title: 'Store',
      href: '/search'
    },
    {
      title: 'Wishlist',
      href: '/wjishlist'
    }
  ];

  useEffect(() => {
    if (open && onClose) {
      onClose();
    }
  }, [pathname]);

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      variant="temporary"
      PaperProps={{
        sx: {
          width: 240
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          color: '#fff'
        }}
      >
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <XIcon />
        </IconButton>
      </Box>
      {!isAuthenticated && (
        <Box sx={{ px: 2 }}>
          <Button
            color="primary"
            component={RouterLink}
            fullWidth
            sx={{ mb: 1.5 }}
            to="/login"
            variant="contained"
          >
            Login
          </Button>
          <Button
            color="primary"
            component={RouterLink}
            fullWidth
            to="/register"
            variant="outlined"
          >
            Register
          </Button>
        </Box>
      )}
      <List>
        {items.map((item) => (
          <MobileSidebarItem
            href={item.href}
            items={item.items}
            key={item.title}
            title={item.title}
          />
        ))}
      </List>
    </Drawer>
  );
};
