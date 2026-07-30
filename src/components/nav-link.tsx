'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/utils/cn';
import type { SxProps } from '@mui/system';
import type { ComponentProps } from 'react';

interface NavLinkProps extends ComponentProps<typeof Link> {
  href: string;
  activeStyles?: SxProps;
  activeClassName: string;
}

export const NavLink = ({
  href,
  className,
  activeClassName,
  ...rest
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname == href;

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...rest}
    />
  );
};
