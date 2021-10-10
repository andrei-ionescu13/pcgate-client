import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Box, Container, List, Typography } from '@material-ui/core';
import { PropertyItem } from '../components/property-item';
import { LibraryProduct } from '../components/library/library-product';
import { useAuthFetch } from '../hooks/use-auth-fetch';
import type { Order as OrderI } from '../types/orders';
import { getCurrencySymbol } from 'utils/get-currency-symbol';

export const Order: FC = () => {
  const { orderId } = useParams();
  const [order, loading] = useAuthFetch<OrderI>(`/orders/${orderId}`);

  if (loading) {
    return null;
  }

  if (order) {
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
                sx={{ mb: 5 }}
                variant="h4"
              >
                Order Details
              </Typography>
              <Box
                sx={{
                  display: {
                    md: 'block',
                    xs: 'none'
                  }
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#1E4582',
                    color: '#fff',
                    display: 'flex',
                    py: 2,
                    '& > div': {
                      flex: 1,
                      px: 2,
                      '&:first-of-type': {
                        flex: 2,
                      }
                    }
                  }}
                >
                  <Box>
                    <Typography
                      color="inherit"
                      component="p"
                      variant="subtitle1"
                    >
                      Order Number
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="p"
                      color="inherit"
                      variant="subtitle1"
                    >
                      Date
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="p"
                      color="inherit"
                      variant="subtitle1"
                    >
                      Status
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="p"
                      color="inherit"
                      variant="subtitle1"
                    >
                      Total
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: 'background.default',
                    color: 'text.secondary',
                    display: 'flex',
                    py: 1,
                    '& > div': {
                      flex: 1,
                      px: 2,
                      '&:first-of-type': {
                        flex: 2,
                      }
                    }
                  }}
                >
                  <Box sx={{ flex: 2 }}>
                    <Typography
                      color="inherit"
                      variant="body1"
                    >
                      {order._id}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      color="inherit"
                      variant="body1"
                    >
                      {format(new Date(order.createdAt), 'MMMM dd, y')}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      color="inherit"
                      variant="body1"
                    >
                      COMPLETE
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      color="inherit"
                      variant="body1"
                    >
                      {getCurrencySymbol(order.currency)}
                      {numeral(order.amount / 100).format('0,0.00')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <List
                sx={{
                  display: {
                    md: 'none'
                  }
                }}
              >
                <PropertyItem
                  content={order._id}
                  label="Order number"
                />
                <PropertyItem
                  content={format(new Date(order.createdAt), 'MMMM dd, y')}
                  label="Date"
                />
                <PropertyItem
                  content="COMPLETE"
                  label="Status"
                />
                <PropertyItem
                  content={`${getCurrencySymbol(order.currency)}${numeral(order.amount / 100).format('0,0.00')}`}
                  label="Total"
                />
              </List>
              <Typography
                color="textPrimary"
                sx={{ my: 5 }}
                variant="h5"
              >
                Order Items
              </Typography>
              <Box
                sx={{
                  mt: 5,
                  display: 'grid',
                  gridAutoFlow: 'row',
                  gap: 2
                }}
              >
                {order.items.map((item) =>
                  <LibraryProduct
                    item={item}
                    key={item._id}
                  />
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </>
    );
  }

  return null;
};
