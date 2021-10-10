import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, Link, Typography } from '@material-ui/core';
import { Steam as SteamIcon } from '../../icons/steam';

interface WishlistProductProps {
  product?: any;
}

export const WishlistProduct: FC<WishlistProductProps> = (props) => {
  const { product } = props;

  return (
    <Card
      elevation={0}
      sx={{
        alignItems: {
          md: 'center'
        },
        backgroundColor: '#1E4582',
        display: 'flex',
        flexDirection: {
          md: 'row',
          xs: 'column'
        },
        p: {
          lg: 1,
          xs: 2
        }
      }}
    >
      <Box
        sx={{
          display: {
            lg: 'block',
            xs: 'none'
          },
          '& img': {
            display: 'block',
            maxWidth: 220,
          }
        }}
      >
        <img
          alt=""
          src="https://hb.imgix.net/24ee40d7cc08d164bee3dab438b4cada89268adc.jpg?auto=compress,format&fit=crop&h=206&w=360&s=36c1e7358f2a8a6e232ca746493bfc28"
        />
      </Box>
      <Box
        sx={{
          maxWidth: 300,
          ml: {
            md: 2,
            xs: 0
          }
        }}
      >
        <Link
          component={RouterLink}
          sx={{ color: '#fff' }}
          to="/asd"
          underline="none"
          variant="body2"
        >
          Among the Sleep - Enhanced EditionAmong the Sleep - Enhanced Edition
        </Link>
        <Box sx={{ mt: 2 }}>
          <SteamIcon />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <Box sx={{
          display: 'flex',
          flexDirection: {
            md: 'row',
            xs: 'column'
          },
          mb: 1,
          mt: {
            md: 0,
            xs: 3
          },
        }}
        >
          <Box sx={{
            backgroundColor: 'background.default',
            borderTopLeftRadius: (theme) => theme.shape.borderRadius,
            borderTopRightRadius: (theme) => ({
              md: 0,
              xs: theme.shape.borderRadius
            }),
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
            borderBottomRightRadius: (theme) => ({
              md: 0,
              xs: theme.shape.borderRadius
            }),
            height: 36,
            mb: {
              md: 0,
              xs: 1
            }
          }}
          >
            <Typography
              color="textPrimary"
              align="center"
              component="p"
              sx={{ p: 0.75 }}
              variant="body1"
            >
              Q0573-2Y6TG-MMJGL
            </Typography>
          </Box>
          <Button
            color="primary"
            sx={{
              borderTopLeftRadius: {
                md: 0
              },
              borderBottomLeftRadius: {
                md: 0
              },
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none'
              }
            }}
            variant="contained"
          >
            Redeem on Steam
          </Button>
        </Box>
        <Link
          align="right"
          color="primary"
          component={RouterLink}
          sx={{ display: 'block' }}
          to="asd"
          underline="none"
          variant="body2"
        >
          How Do I Redeem My Key?
        </Link>
      </Box>
    </Card>
  );
};
