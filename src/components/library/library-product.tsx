import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, Link, Typography } from '@material-ui/core';
import { Steam as SteamIcon } from '../../icons/steam';
import type { Product } from 'types/product';

interface LibraryProductProps {
  item: {
    _id: string;
    product: Product;
  }
}

export const LibraryProduct: FC<LibraryProductProps> = (props) => {
  const { item } = props;
  const { product } = item;

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
          src={`https://fanatical.imgix.net/product/original/${product.cover}?auto=compress,format&w=350&fit=crop&h=197`}
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
          {product.name}
        </Link>
        <Box sx={{ mt: 2 }}>
          <SteamIcon sx={{ color: '#fff' }} />
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
              align="center"
              color="textPrimary"
              component="p"
              sx={{ p: 0.75 }}
              variant="body1"
            >
              Q0573-2Y6TG-MMJGL
            </Typography>
          </Box>
          <Button
            color="primary"
            component="a"
            href="https://store.steampowered.com/account/registerkey?key=ARH4Y-8LF9Y-EQGH3"
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
            target="_blank"
            variant="contained"
          >
            Redeem on Steam
          </Button>
        </Box>
        <Link
          align="right"
          color="primary"
          href="https://help.steampowered.com/en/faqs/view/2A12-9D79-C3D7-F870"
          sx={{ display: 'block' }}
          target="_blank"
          underline="none"
          variant="body2"
        >
          How Do I Redeem My Key?
        </Link>
      </Box>
    </Card>
  );
};
