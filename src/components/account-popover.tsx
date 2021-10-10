import { useState, useRef } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, List, ListItemButton, Popover, Typography } from '@material-ui/core';
import { styled } from '@material-ui/system';
import type { SxProps } from '@material-ui/system';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { useAuth } from '../contexts/auth-context';

interface AccountPopoverProps {
  sx?: SxProps;
}

const links = [
  {
    href: '/account',
    label: 'Settings'
  },
  {
    href: '/wishlist',
    label: 'Wishlist'
  },
  {
    href: '/orders',
    label: 'Orders'
  }
];

const AccountPopoverRoot = styled(Box)(
  () => ({
    alignItems: 'center',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex'
  }));

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { logout } = useAuth();
  const anchorRef = useRef<Element | null>(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <AccountPopoverRoot
        onClick={handleOpen}
        ref={anchorRef}
        {...props}
      >
        <Typography
          color="inherit"
          sx={{
            ml: 1,
            whiteSpace: 'nowrap'
          }}
          variant="body2"
        >
          My Account
        </Typography>
        <ChevronDownIcon
          fontSize="small"
          sx={{ color: 'inherit' }}
        />
      </AccountPopoverRoot>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            maxWidth: 160,
            width: '100%'
          }
        }}
      >
        <List>
          {links.map((link) => (
            <ListItemButton
              component={RouterLink}
              key={link.href}
              to={link.href}
            >
              {link.label}
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={handleLogout}
            sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            Logout
          </ListItemButton>
        </List>
      </Popover>
    </>
  );
};
