import type { NextPage, GetServerSideProps } from "next";
import {
  QueryClient,
  dehydrate,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import numeral from "numeral";
import { Box, List, Typography, useTheme, useMediaQuery } from "@mui/material";
import { PropertyItem } from "@/components/property-item";
import { getCurrencySymbol } from "@/utils/get-currency-symbol";
import Head from "next/head";
import { appFetch } from "@/utils/app-fetch";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LibraryProduct } from "../../../components/library-product";
import { AccountLayout } from "layout/account/account-layout";
import type { Order as OrderI } from "@/types/orders";
import type { Product } from "@/types/product";
import type { ProductKey } from "@/types/common";
import { NextPageWithLayout } from "pages/_app";
import { Layout } from "layout/layout";

const getUserOrder =
  (id: string, config: Record<string, any> = {}) =>
  () =>
    appFetch<OrderI>({
      url: `/orders/${id}`,
      withAuth: true,
      ...config,
    });

const Order: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { id } = query as { id: string };
  const queryClient = useQueryClient();
  const { data: order } = useQuery(["order", id], getUserOrder(id));
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  if (!order) return null;

  const onActivateKey = (
    keyValue: string,
    product: Product,
    productKey: ProductKey
  ): void => {
    queryClient.setQueryData<OrderI>(["order", id], (prev) => {
      if (!prev) return;

      const order = prev;
      const item = order.lineItems.find(
        (item) => item.productId === product._id
      );
      const key = item?.keys.find((_key) => _key._id === productKey._id);

      if (!key) return;

      key.value = keyValue;
      return order;
    });
  };

  return (
    <>
      <Head>
        <title>Order</title>
      </Head>
      <Box>
        <Typography color="textPrimary" sx={{ mb: 5 }} variant="h4">
          Order Details
        </Typography>
        <Box
          sx={{
            display: {
              md: "block",
              xs: "none",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#1E4582",
              color: "#fff",
              display: "flex",
              py: 2,
              "& > div": {
                flex: 1,
                px: 2,
                "&:first-of-type": {
                  flex: 2,
                },
              },
            }}
          >
            <Box>
              <Typography color="inherit" component="p" variant="subtitle1">
                Order Number
              </Typography>
            </Box>
            <Box>
              <Typography component="p" color="inherit" variant="subtitle1">
                Date
              </Typography>
            </Box>
            <Box>
              <Typography component="p" color="inherit" variant="subtitle1">
                Status
              </Typography>
            </Box>
            <Box>
              <Typography component="p" color="inherit" variant="subtitle1">
                Total
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "background.default",
              color: "text.secondary",
              display: "flex",
              py: 1,
              "& > div": {
                flex: 1,
                px: 2,
                "&:first-of-type": {
                  flex: 2,
                },
              },
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Typography color="inherit" variant="body1">
                {order._id}
              </Typography>
            </Box>
            <Box>
              <Typography color="inherit" variant="body1">
                {format(new Date(order.createdAt), "MMMM dd, y")}
              </Typography>
            </Box>
            <Box>
              <Typography color="inherit" variant="body1">
                COMPLETE
              </Typography>
            </Box>
            <Box>
              <Typography color="inherit" variant="body1">
                {order.currency.symbol}
                {order.totalPrice}
              </Typography>
            </Box>
          </Box>
        </Box>
        <List
          sx={{
            display: {
              md: "none",
            },
          }}
        >
          <PropertyItem
            content={order._id}
            label="Order number"
            align={smUp ? "horizontal" : "vertical"}
          />
          <PropertyItem
            content={format(new Date(order.createdAt), "MMMM dd, y")}
            label="Date"
            align={smUp ? "horizontal" : "vertical"}
          />
          <PropertyItem
            content="COMPLETE"
            label="Status"
            align={smUp ? "horizontal" : "vertical"}
          />
          <PropertyItem
            content={`${order.currency.symbol}${order.totalPrice}`}
            label="Total"
            align={smUp ? "horizontal" : "vertical"}
          />
        </List>
        <Typography color="textPrimary" sx={{ my: 5 }} variant="h5">
          Order Items
        </Typography>
        <Box
          sx={{
            mt: 5,
            display: "grid",
            gridAutoFlow: "row",
            gap: 2,
          }}
        >
          {order.lineItems.map((item) =>
            item.keys.map((key) => (
              <LibraryProduct
                product={item.product}
                productKey={key}
                key={key._id}
                onActivateKey={onActivateKey}
              />
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
  locale,
}) => {
  const queryClient = new QueryClient();
  const { id } = query as { id: string };

  try {
    await queryClient.fetchQuery(["order", id], getUserOrder(id, { req, res }));
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ["common", "footer"])),
    },
  };
};

export default Order;

Order.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  );
};
