import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string; // optional, in case your backend sends it
  };
  size: string;
  quantity: number;
  priceAtOrderTime: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number; 
  status: string;
  createdAt: string;
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
}

export interface CreateOrderArgs {
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/order`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // your bearer token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/my-orders",
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation<Order, CreateOrderArgs>({
      query: (data) => ({
        url: "/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});


export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;
