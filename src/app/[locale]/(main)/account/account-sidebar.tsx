'use client';

import { Button } from '@/components/button';
import { useAuth } from '@/contexts/auth-context';
import { useOpen } from '@/hooks/use-open';
import { Link, usePathname } from '@/i18n/navigation';
import { Camera as CameraIcon } from '@/icons/camera';
import { cn } from '@/utils/cn';
import { Avatar, List, Skeleton } from '@mui/material';
import { AvatarDialog } from 'layout/avatar-dialog';
import Image from 'next/image';
import type { FC } from 'react';

interface AccountSidebarProps {}

const links = [
  {
    href: '/account',
    label: 'Settings',
  },
  {
    href: '/account/orders',
    label: 'Orders',
  },
  {
    href: '/account/library',
    label: 'Library',
  },
  {
    href: '/account/reviews',
    label: 'Reviews',
  },
  {
    href: '/account/coupons',
    label: 'Coupons',
  },
];

export const AccountSidebar: FC<AccountSidebarProps> = () => {
  const { decoded, user } = useAuth();
  const pathname = usePathname();
  const [open, handleOpen, handleClose] = useOpen();

  return (
    <div>
      {open && <AvatarDialog onClose={handleClose} />}
      <div className="grid place-items-center p-4">
        <Button
          className="relative"
          onClick={handleOpen}
        >
          {user?.avatar ? (
            <Avatar
              sx={{
                width: 50,
                height: 50,
              }}
            >
              <Image
                alt=""
                priority
                src={user.avatar}
                layout="fill"
                objectFit="cover"
              />
            </Avatar>
          ) : (
            <Skeleton
              variant="circular"
              width={50}
              height={50}
            />
          )}
          <CameraIcon
            color="primary"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 16,
              height: 16,
            }}
          />
        </Button>
        <p className="caption mt-1 text-center">{decoded?.email}</p>
      </div>
      <div>
        <List>
          {links.map((link) => {
            const isActive = pathname == link.href;
            const activeClassName =
              "before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[3px] before:content-[''] before:bg-primary";

            return (
              <li key={link.href}>
                <Button
                  asChild
                  size="large"
                  className={cn(
                    'w-full rounded-none pl-2',
                    isActive && activeClassName
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            );
          })}
        </List>
      </div>
    </div>
  );
};
