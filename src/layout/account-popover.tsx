'use client';

import { useAuth } from '@/contexts/auth-context';
import { Link, useRouter } from '@/i18n/navigation';
import { ApiError } from '@/utils/api-error';
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  Popover,
  Skeleton,
} from '@mui/material';
import type { SxProps } from '@mui/system';
import { styled } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import type { FC } from 'react';
import { useRef, useState } from 'react';

interface AccountPopoverProps {
  sx?: SxProps;
}

const links = [
  {
    href: '/account',
    label: 'Settings',
  },
  {
    href: '/wishlist',
    label: 'Wishlist',
  },
  {
    href: '/account/orders',
    label: 'Orders',
  },
  {
    href: '/account/library',
    label: 'Library',
  },
];

const AccountPopoverRoot = styled(Box)(() => ({
  alignItems: 'center',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
}));

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { user, logout } = useAuth();
  const mutation = useMutation<void, ApiError>({ mutationFn: logout });
  const anchorRef = useRef<Element | null>(null);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/');
        router.refresh();
      },
    });
  };

  return (
    <>
      <AccountPopoverRoot
        onClick={handleOpen}
        ref={anchorRef}
        {...props}
      >
        {user?.avatar ? (
          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
          >
            <Image
              unoptimized
              fill
              alt="avatar"
              src={user.avatar}
            />
          </Avatar>
        ) : (
          <Skeleton
            variant="circular"
            width={36}
            height={36}
          />
        )}
      </AccountPopoverRoot>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            maxWidth: 160,
            width: '100%',
          },
        }}
      >
        <List>
          {links.map((link) => (
            <ListItemButton
              component={Link}
              href={link.href}
              key={link.href}
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
