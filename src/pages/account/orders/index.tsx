import Head from "next/head";
import type { NextPage, GetServerSideProps } from "next";
import { Box, Pagination, Typography } from "@mui/material";
import { appFetch } from "@/utils/app-fetch";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { AccountLayout } from "layout/account/account-layout";
import { SearchInput } from "../../../components/search-input";
import { ChangeEvent, FormEvent, useState } from "react";
import type { Order as OrderI } from "@/types/orders";
import { Order } from "@/components/account/orders/order";
import { NextPageWithLayout } from "pages/_app";
import { Layout } from "layout/layout";

interface GetUserOrdersReturn {
  orders: OrderI[];
  count: number;
}

const getUserOrders =
  (query: Record<string, any>, config: Record<string, any> = {}) =>
  () =>
    appFetch<GetUserOrdersReturn>({
      url: "/orders",
      withAuth: true,
      query,
      ...config,
    });

const Orders: NextPageWithLayout = () => {
  const [keyword, setKeyword] = useState("");
  const [queryKeyword, setQueryKeyword] = useState("");
  const [page, setPage] = useState(1);
  const query = {
    keyword: queryKeyword,
    page,
  };
  const { data, isPreviousData, isRefetching } = useQuery(
    ["orders", query],
    getUserOrders(query),
    { keepPreviousData: true }
  );

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSubmit = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    setQueryKeyword(keyword);
  };

  if (!data) return null;
  const { orders, count } = data;

  return (
    <>
      <Head>
        <title>Order</title>
      </Head>
      <Box>
        <Typography color="textPrimary" variant="h4">
          Orders
        </Typography>
        <Typography
          color="textSecondary"
          sx={{
            mb: 5,
            mt: 2,
          }}
          variant="body1"
        >
          To view an order in more detail, and to view the keys associated with
          that order, simply click on View Order for the appropriate order.
        </Typography>
        <Box mb={5}>
          <form onSubmit={handleSubmit}>
            <SearchInput
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="Search by game"
            />
          </form>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1E4582",
            color: "#fff",
            py: 2,
          }}
        >
          <Typography
            color="inherit"
            component="p"
            sx={{
              display: {
                md: "none",
              },
              px: 2,
            }}
            variant="subtitle1"
          >
            Order
          </Typography>
          <Box
            sx={{
              display: {
                md: "flex",
                xs: "none",
              },
              "& > div": {
                px: 2,
              },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography color="inherit" variant="subtitle1">
                Date
              </Typography>
            </Box>
            <Box sx={{ flex: 2 }}>
              <Typography color="inherit" variant="subtitle1">
                Items
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography color="inherit" variant="subtitle1">
                Status
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography color="inherit" variant="subtitle1">
                Action
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.default",
            position: "relative",
            filter:
              isRefetching && isPreviousData
                ? "blur(4px) saturate(100%)"
                : undefined,
          }}
        >
          {isRefetching && isPreviousData && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 999,
              }}
            />
          )}
          {orders?.map((order) => (
            <Order
              key={order._id}
              order={order}
              sx={{
                "& + &": {
                  mt: 1,
                },
              }}
            />
          ))}
        </Box>
        {count > 2 && (
          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={Math.ceil(count / 2)}
              variant="outlined"
              color="primary"
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
  res,
}) => {
  const queryClient = new QueryClient();
  const query = {
    keyword: "",
    page: 1,
  };
  try {
    await queryClient.fetchQuery(
      ["orders", query],
      getUserOrders(query, { req, res })
    );
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Orders;

Orders.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  );
};
