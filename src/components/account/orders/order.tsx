import type { FC } from "react";
import { format } from "date-fns";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";
import type { SxProps } from "@mui/system";
import { Link } from "@/components/link";
import type { Order as OrderI } from "@/types/orders";

interface OrderProps {
  order: OrderI;
  sx?: SxProps;
}

const OrderRoot = styled("div")(({ theme }) => ({
  display: "flex",
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  "& > div": {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    "& > div": {
      paddingBottom: theme.spacing(0.5),
      paddingTop: theme.spacing(0.5),
    },
  },
}));

export const Order: FC<OrderProps> = (props) => {
  const { order, ...rest } = props;

  return (
    <OrderRoot {...rest}>
      <Box
        sx={{
          flex: 1,
          order: 1,
        }}
      >
        <Typography color="textSecondary" variant="subtitle2">
          {format(new Date(order.createdAt), "MMMM dd, y")}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 2,
          order: {
            md: 2,
            xs: 3,
          },
        }}
      >
        <List disablePadding>
          {order.lineItems.map((item, index) => (
            <ListItem
              disableGutters
              disablePadding
              key={item._id}
              divider={index + 1 < order.lineItems.length}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography color="textSecondary" variant="body2">
                {item.product.title}
                {item.quantity > 1 && `(x${item.quantity})`}
              </Typography>
              <Typography color="textSecondary" variant="body3">
                {order.currency.symbol}
                {item.finalLinePrice}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          flex: 1,
          order: {
            md: 3,
            xs: 2,
          },
        }}
      >
        <Typography
          color="textSecondary"
          sx={{ textTransform: "uppercase" }}
          variant="subtitle2"
        >
          {order.fulfillmentStatus}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          order: 4,
        }}
      >
        <Button
          color="primary"
          component={Link}
          href={`/account/orders/${order._id}`}
          variant="contained"
        >
          View order
        </Button>
      </Box>
    </OrderRoot>
  );
};
