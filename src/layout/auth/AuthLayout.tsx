import type { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface AuthLayoutProps {
  children: ReactNode;
  text?: string;
}

export const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const { children, text = "" } = props;

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.default',
        display: 'flex',
        flex: 1,
      }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          gridAutoFlow: 'column',
          flex: 1,
          gridTemplateColumns: {
            md: '480px 1fr',
            xs: '1fr'
          }
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              px: {
                md: 10,
                xs: 3,
              },
              pt: {
                xl: 18,
                lg: 5,
                xs: 8
              }
            }}
          >
            {children}
          </Box>
        </Box>
        <Box
          sx={{
            backgroundImage: 'url("https://cdn.akamai.steamstatic.com/steam/apps/1817070/ss_dfba6f2477bfa42be69ddfdffbd421d3943d20bf.1920x1080.jpg?t=1667406675")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            display: {
              md: 'flex',
              xs: 'none'
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 75%)'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              px: 10,
              pb: 20,
              alignItems: 'flex-end',
              position: 'relative',
              flex: 1
            }}
          >
            <Typography
              color="textPrimary"
              variant="h2"
            >
              {text}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}