import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, Link, List, ListItem } from '@mui/material';
import { NavLink } from './nav-link';

const items = [
  {
    href: '#',
    label: 'Top Sellers',
  },
  {
    href: '#',
    label: 'On Sale now',
  },
  {
    href: '#',
    label: 'New Releases',
  },
  {
    href: '#',
    label: 'New to Fanatical',
  },
  {
    href: '#',
    label: 'Coming soon',
  },
  {
    href: '#',
    label: 'Lastr Change to Save',
  },
  {
    href: '#',
    label: 'Browse be Genre',
  },
  {
    href: '#',
    label: 'Browse by publisher',
  },
  {
    href: '#',
    label: 'Browse all',
  }
]

export const StoreDropdown: FC = () => {
  return (
    <NavLink
      href="#"
      title="Store"
      sx={{ pl: 0 }}
      dropdown={(
        <Card
          elevation={8}
          sx={{
            color: 'text.secondary',
            display: 'none',
            minWidth: 240,
            position: 'absolute',
            px: 2,
            py: 1,
            top: 56
          }}
        >
          <List disablePadding>
            {items.map((item) => (
              <ListItem
                disablePadding
                key={item.label}
                sx={{
                  '& + &': {
                    mt: 0.5
                  }
                }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to={item.href}
                  underline="none"
                  sx={{
                    '&:hover': {
                      fontWeight: 600,
                      color: 'primary.main'
                    }
                  }}
                  variant="body1"
                >
                  {item.label}
                </Link>
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    />
  );
};
