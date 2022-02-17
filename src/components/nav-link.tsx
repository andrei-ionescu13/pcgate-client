import type { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import type { SxProps } from '@mui/system';
import { styled } from '@mui/system';

interface NavLinkProps {
  active?: boolean;
  dropdown?: ReactNode;
  href: string;
  sx?: SxProps;
  title: string;
}

const NavLinkRoot = styled('li')({});

export const NavLink: FC<NavLinkProps> = (props) => {
  const { active, href, title } = props;

  return (
    <NavLinkRoot {...props}>
      <Link
        color="inherit"
        component={RouterLink}
        key={href}
        sx={{
          color: active ? '#FF8552' : 'inherit',
          textTransform: 'uppercase',
          '&:hover': {
            color: '#FF8552'
          }
        }}
        to={href}
        underline="none"
        variant="subtitle2"
      >
        {title}
      </Link>
    </NavLinkRoot>
  );
};
