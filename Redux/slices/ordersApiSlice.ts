import { Order } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = process.env.NEXT_PUBLIC_MAIN_URL;

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/orders` }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "",
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (newOrder) => ({
        url: "",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation<Order, Partial<Order>>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Orders"],
    }),
    toggleActiveStatus: builder.mutation<Order, { id: string; active: boolean }>({
      query: ({ id, active }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { active },
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    updateDecision: builder.mutation<Order, { id: string; decision: "reject" | "accept" | "escalate" }>({
      query: ({ id, decision }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { decision },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useToggleActiveStatusMutation,
  useDeleteOrderMutation,
  useUpdateDecisionMutation
} = ordersApi;
