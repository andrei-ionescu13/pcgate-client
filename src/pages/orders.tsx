import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography } from '@mui/material';
import { Order } from '../components/orders/order';
import { useGetOrders } from 'api/orders';

export const Orders: FC = () => {
  const { data: orders, isLoading: loading } = useGetOrders();

  if (loading) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 5
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: 'background.paper',
              p: {
                md: 5,
                xs: 2
              }
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Orders
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                mb: 5,
                mt: 2
              }}
              variant="body1"
            >
              To view an order in more detail, and to view the keys associated with that order, simply click on View Order for the appropriate order.
            </Typography>
            <Box
              sx={{
                backgroundColor: '#1E4582',
                color: '#fff',
                py: 2
              }}
            >
              <Typography
                color="inherit"
                component="p"
                sx={{
                  display: {
                    md: 'none'
                  },
                  px: 2
                }}
                variant="subtitle1"
              >
                Order
              </Typography>
              <Box
                sx={{
                  display: {
                    md: 'flex',
                    xs: 'none'
                  },
                  '& > div': {
                    px: 2
                  }
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    Date
                  </Typography>
                </Box>
                <Box sx={{ flex: 2 }}>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    Items
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    Status
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    Action
                  </Typography>
                </Box>
              </Box>
            </Box>
            {orders?.map((order) => (
              <Order
                key={order._id}
                order={order}
                sx={{
                  '& + &': {
                    mt: 1
                  }
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};
