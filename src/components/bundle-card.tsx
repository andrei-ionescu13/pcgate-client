import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Chip, Link, Typography } from '@mui/material';
import type { Bundle } from '../types/bundle';

interface BundleCardProps {
  bundle: Bundle;
}

export const BundleCard: FC<BundleCardProps> = (props) => {
  const { bundle } = props;

  return (
    <Link
      component={RouterLink}
      sx={{
        '&:hover': {
          '.MuiCardMedia-root': {
            filter: 'blur(8px)'
          },
          '.MuiCardMedia-root + div': {
            display: 'flex'
          }
        }
      }}
      underline="none"
      to="#"
    >
      <Card sx={{ color: '#fff' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            image="https://hb.imgix.net/24ee40d7cc08d164bee3dab438b4cada89268adc.jpg?auto=compress,format&fit=crop&h=206&w=360&s=36c1e7358f2a8a6e232ca746493bfc28"
            sx={{
              transition: 'filter 100ms',
              zIndex: 10,
              height: 200,
              position: 'relative',
              overflow: 'hidden'
            }}
          />
          <Box
            sx={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'none',
              zIndex: 100,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              p: 2
            }}
          >
            <Typography
              align="center"
              color="inherit"
              variant="h5"
            >
              Pay what you want
            </Typography>
            <Typography
              align="center"
              color="textSecondary"
              sx={{ my: 2 }}
              variant="body2"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, laboriosam ab quia fugit itaque odio voluptas
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                textTransform: 'uppercase'
              }}
            >
              <Typography
                align="center"
                color="inherit"
                sx={{ mr: 1 }}
                variant="caption"
              >
                {bundle.items.length}
                {' '}
                {bundle.category}
              </Typography>
              <span>
                ●
              </span>
              <Typography
                align="center"
                color="inherit"
                sx={{ mx: 1 }}
                variant="caption"
              >
                {bundle.value} value
              </Typography>
              <span>
                ●
              </span>
              <Typography
                align="center"
                color="inherit"
                sx={{ ml: 1 }}
                variant="caption"
              >
                Your price {bundle.price}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CardContent sx={{
          backgroundColor: '#1E4582',
          position: 'relative',
          zIndex: 1000
        }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="inherit"
              variant="h6"
            >
              {bundle.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Chip
              sx={{ color: '#fff' }}
              label="days left"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
