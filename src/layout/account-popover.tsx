'use client';

import { Avatar } from '@/components/avatar';
import { Divider } from '@/components/divider';
import { ListButton } from '@/components/dropdown-button';
import { Skeleton } from '@/components/skeleton';
import { useAuth } from '@/contexts/auth-context';
import { Link, useRouter } from '@/i18n/navigation';
import { ApiError } from '@/utils/api-error';
import { Popover } from '@mui/material';
import type { SxProps } from '@mui/system';
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

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { user, logout } = useAuth();
  const mutation = useMutation<void, ApiError>({ mutationFn: logout });
  const anchorRef = useRef<HTMLButtonElement>(null);
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
      <div
        className="flex"
        {...props}
      >
        {user?.avatar ? (
          <button
            className="inline-flex"
            onClick={handleOpen}
            ref={anchorRef}
          >
            <Avatar>
              <Image
                unoptimized
                fill
                alt="avatar"
                src={user.avatar}
              />
            </Avatar>
          </button>
        ) : (
          <Skeleton
            variant="circular"
            className="h-10 w-10"
          />
        )}
      </div>
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
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <ListButton asChild>
                <Link href={link.href}>{link.label}</Link>
              </ListButton>
            </li>
          ))}
        </ul>
        <Divider />
        <ListButton onClick={handleLogout}>Logout</ListButton>
      </Popover>
    </>
  );
};
