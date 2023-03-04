import type { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from '@/components/link';

const items = [
  {
    href: '/search?os=windows',
    label: 'Windows Games'
  },
  {
    href: '/search?os=linux',
    label: 'Linux Games'
  },
  {
    href: '/search?os=mac',
    label: 'Mac Games'
  },
  {
    href: '/search?drm=steam',
    label: 'Steam Games'
  },
  {
    href: '/search?drm=uplay',
    label: 'Uplay Games'
  },
  {
    href: '/search?drm=rockstar',
    label: 'Rockstar Games'
  },
  {
    href: '/search?genres=Indie',
    label: 'Indie Games'
  },
  {
    href: '/search?genres=Action',
    label: 'Action Games'
  },
  {
    href: '/search?genres=Adventure',
    label: 'Adventure Games'
  },
  {
    href: '/search?genres=Strategy',
    label: 'Strategy Games'
  },
  {
    href: '/search?genres=Roleplaying',
    label: 'Roleplaying Games'
  },
  {
    href: '/search?genres=Casual',
    label: 'Casual Games'
  },
  {
    href: '/search?genres=Sports',
    label: 'Sports Games'
  },
  {
    href: '/search?genres=Racing',
    label: 'Racing Games'
  },
  {
    href: '/search?genres=Shooter',
    label: 'Shooter Games'
  }
];

export const BrowseSection: FC = () => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      py: 8
    }}
  >
    <Typography
      color="textPrimary"
      sx={{ mb: 3 }}
      variant="h4"
    >
      Browse
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          lg: 'repeat(5, 1fr)',
          md: 'repeat(4, 1fr)',
          sm: 'repeat(3, 1fr)',
          xs: 'repeat(2, 1fr)',
        }
      }}
    >
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
              xs: 12
            },
            px: 0
          }}
          variant="outlined"
        >
          {item.label}
        </Button>
      ))}
    </Box>
  </Box>
);
