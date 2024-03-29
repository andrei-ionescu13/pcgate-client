import type { FC, ReactNode } from 'react';
import type { SxProps } from '@mui/system';
import { styled } from '@mui/system';
import { deepmerge } from '@mui/utils';
import { Link } from '@/components/link';
import { useRouter } from 'next/router';
import type { LinkProps } from '@mui/material/Link';

interface NavLinkProps extends LinkProps {
  dropdown?: ReactNode;
  href: string;
  sx?: SxProps;
  activeStyles?: SxProps
}

export const NavLink: FC<NavLinkProps> = (props) => {
  const { href, activeStyles = {}, sx, ...rest } = props;
  const router = useRouter();
  const isActive = router.pathname == href;

  return (
    <Link
      href={href}
      sx={deepmerge(sx, isActive ? activeStyles : {})}
      {...rest}
    />
  );
};
