'use client';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Skeleton } from '@/components/skeleton';
import { useAuth } from '@/contexts/auth-context';
import { useOpen } from '@/hooks/use-open';
import { Link, usePathname } from '@/i18n/navigation';
import { Camera as CameraIcon } from '@/icons/camera';
import { cn } from '@/utils/cn';
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
        {user?.avatar ? (
          <button
            className="relative inline-flex"
            onClick={handleOpen}
          >
            <Avatar size="large">
              <Image
                alt="avatar"
                priority
                src={user.avatar}
                layout="fill"
                objectFit="cover"
                unoptimized
              />
            </Avatar>
            <CameraIcon className="h4 text-primary absolute right-0 bottom-0 w-4" />
          </button>
        ) : (
          <Skeleton
            variant="circular"
            className="h-12 w-12"
          />
        )}
        <p className="caption mt-1 text-center">{decoded?.email}</p>
      </div>
      <div>
        <ul>
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
                    'w-full justify-start rounded-none pl-4 text-left',
                    isActive && activeClassName
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
