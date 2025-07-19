import { Order } from "@/types/orders";
import { appFetch } from "@/utils/app-fetch";

export const getUserOrder =
  (id: string,) =>
    appFetch<Order>({
      url: `/orders/${id}`,
      withAuth: true,
    });