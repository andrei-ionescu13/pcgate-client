import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Box, Button, List, ListItem, Typography } from '@material-ui/core';
import { styled } from '@material-ui/system';
import type { SxProps } from '@material-ui/system';
import { getCurrencySymbol } from 'utils/get-currency-symbol';

interface OrderProps {
  order: any;
  sx?: SxProps;
}

const OrderRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  '& > div': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    '& > div': {
      paddingBottom: theme.spacing(0.5),
      paddingTop: theme.spacing(0.5),
    },
  },
}));

export const Order: FC<OrderProps> = (props) => {
  const { order, ...other } = props;

  return (
    <OrderRoot {...other}>
      <Box sx={{
        flex: 1,
        order: 1
      }}
      >
        <Typography
          color="textSecondary"
          variant="subtitle2"
        >
          {format(new Date(order.createdAt), 'MMMM dd, y')}
        </Typography>
      </Box>
      <Box sx={{
        flex: 2,
        order: {
          md: 2,
          xs: 3
        }
      }}
      >
        <List disablePadding>
          {order.items.map((item: any, index: number) => (
            <ListItem
              disableGutters
              disablePadding
              key={item._id}
              divider={index + 1 < order.items.length}
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {item.product.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {getCurrencySymbol(order.currency)}
                {numeral(item.product.currentPrice[order.currency] / 100).format('0,0.00')}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{
        flex: 1,
        order: {
          md: 3,
          xs: 2
        }
      }}
      >
        <Typography
          color="textSecondary"
          sx={{ textTransform: 'uppercase' }}
          variant="subtitle2"
        >
          COMPLETE
        </Typography>
      </Box>
      <Box sx={{
        flex: 1,
        order: 4
      }}
      >
        <Button
          color="primary"
          component={RouterLink}
          to={`/orders/${order._id}`}
          variant="contained"
        >
          View order
        </Button>
      </Box>
    </OrderRoot>
  );
};