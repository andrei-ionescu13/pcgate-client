import { Link } from '@/components/link';
import { Button } from '@mui/material';
import type { FC } from 'react';

const items = [
  {
    href: '/search?os=windows',
    label: 'Windows Games',
  },
  {
    href: '/search?os=linux',
    label: 'Linux Games',
  },
  {
    href: '/search?os=mac',
    label: 'Mac Games',
  },
  {
    href: '/search?drm=steam',
    label: 'Steam Games',
  },
  {
    href: '/search?drm=uplay',
    label: 'Uplay Games',
  },
  {
    href: '/search?drm=rockstar',
    label: 'Rockstar Games',
  },
  {
    href: '/search?genres=Indie',
    label: 'Indie Games',
  },
  {
    href: '/search?genres=Action',
    label: 'Action Games',
  },
  {
    href: '/search?genres=Adventure',
    label: 'Adventure Games',
  },
  {
    href: '/search?genres=Strategy',
    label: 'Strategy Games',
  },
  {
    href: '/search?genres=Roleplaying',
    label: 'Roleplaying Games',
  },
  {
    href: '/search?genres=Casual',
    label: 'Casual Games',
  },
  {
    href: '/search?genres=Sports',
    label: 'Sports Games',
  },
  {
    href: '/search?genres=Racing',
    label: 'Racing Games',
  },
  {
    href: '/search?genres=Shooter',
    label: 'Shooter Games',
  },
];

export const BrowseSection: FC = () => (
  <div className="py-16">
    <h4 className="mb-6">Browse</h4>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <Button
          color="primary"
          component={Link}
          fullWidth
          href={item.href}
          key={item.label}
          size="large"
          sx={{
            fontSize: {
              sm: 14,
              xs: 12,
            },
            px: 0,
          }}
          variant="outlined"
        >
          {item.label}
        </Button>
      ))}
    </div>
  </div>
);
