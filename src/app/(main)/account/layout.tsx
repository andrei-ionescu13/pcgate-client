"use client"

import { useState } from 'react'
import type { FC, ReactNode, MouseEvent } from 'react'
import { Link } from '@/components/link';
import { useAuth } from '@/contexts/auth-context';
import { Menu as MenuIcon } from '@/icons/menu';
import { Avatar, Button, ButtonBase, Card, Container, Drawer, List, Typography, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import { Camera as CameraIcon } from '@/icons/camera';
import { useOpen } from '@/hooks/use-open';
import { useMutation } from '@tanstack/react-query';
import { appFetch } from '@/utils/app-fetch';
import { AppImage } from '@/components/app-image';
import { AvatarDialog } from 'layout/avatar-dialog';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface AccountLayoutProps {
  children: ReactNode;
}

interface AccountSidebarProps {
}

const links = [
  {
    href: '/account',
    label: 'Settings'
  },
  {
    href: '/account/orders',
    label: 'Orders'
  },
  {
    href: '/account/library',
    label: 'Library'
  },
  {
    href: '/account/reviews',
    label: 'Reviews'
  },
  {
    href: '/account/coupons',
    label: 'Coupons'
  },
]
export const useUpdateAvatar = () => useMutation<any, Error, BodyInit>((values) => appFetch({
  url: '/auth/avatar',
  noContentType: true,
  config: {
    body: values,
    method: 'PUT'
  },
  withAuth: true
}));

const AccountSidebar: FC<AccountSidebarProps> = (props) => {
  const { decoded, user } = useAuth();
  const pathname = usePathname()
  const [open, handleOpen, handleClose] = useOpen();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'background.paper',
      }}
    >
      {open && <AvatarDialog onClose={handleClose} />}
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          placeContent: 'center',
          p: 2
        }}
      >
        <ButtonBase
          disableRipple
          sx={{ position: 'relative' }}
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
                layout='fill'
                objectFit="cover"
              />
            </Avatar>
          ) :
            <Skeleton
              variant="circular"
              width={50}
              height={50}
            />
          }
          <CameraIcon
            color='primary'
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 16,
              height: 16,
            }}
          />
        </ButtonBase>
        <Typography
          color="textPrimary"
          variant="caption"
          align="center"
          mt={1}
        >
          {decoded?.email}
        </Typography>
      </Box>
      <Box>
        <List>
          {links.map((link) => (
            <li key={link.href}>
              <Button
                component={Link}
                href={link.href}
                disableRipple
                fullWidth
                size="large"
                color="white"
                sx={{
                  borderRadius: 0,
                  justifyContent: 'flex-start',
                  position: 'relative',
                  pl: 2,
                  "&::before": {
                    display: pathname == link.href ? undefined : 'none',
                    content: '""',
                    width: 3,
                    backgroundColor: 'primary.main',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    position: 'absolute',
                  }
                }}
              // activeStyles={{
              //   "&::before": {
              //     display: 'block',
              //   }
              // }}
              >
                {link.label}
              </Button>
            </li>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default function AccountLayout(props) {
  const { children } = props;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (event: MouseEvent<HTMLButtonElement>) => {
    setDrawerOpen(true);
  }

  const handleCloseDrawer = (event: MouseEvent<HTMLButtonElement>) => {
    setDrawerOpen(false);
  }

  return (
    <>
      <Drawer
        sx={{
          marginTop: '110px',
          width: 240,
          flexShrink: 0,
          position: 'relative',
          '& .MuiDrawer-paper': {
            marginTop: '110px',
            height: 'calc(100% - 110px)',
            width: 240,
            boxSizing: 'border-box',
          },
          '& .MuiBackdrop-root': {
            marginTop: '110px',
          },
        }}
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <AccountSidebar />
      </Drawer>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 5,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Button
            onClick={handleOpenDrawer}
            color="darkGrey"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              justifyContent: 'flex-start',
              mb: 2,
              display: {
                lg: 'none',
                xs: 'inline-flex'
              },
            }}
          >
            <MenuIcon sx={{ mr: 2 }} />
            Account menu
          </Button>
          <Card
            sx={{
              backgroundColor: 'background.paper',
              position: 'relative',
              display: 'grid',
              height: '100%',
              gridTemplateColumns: {
                lg: '240px 1fr',
                xs: '1fr'
              },
            }}
          >
            <Box
              sx={{
                borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                display: {
                  lg: 'block',
                  xs: 'none'
                },
                position: 'sticky',
                top: 0
              }}
            >
              <AccountSidebar />
            </Box>
            <Box
              sx={{
                p: {
                  md: 5,
                  xs: 2
                }
              }}
            >
              {children}
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  )
}