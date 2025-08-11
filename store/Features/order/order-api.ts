import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface OrderItem {
  product: string;
  size: string;
  quantity: number;
  priceAtOrderTime: number;
}
export interface CreateOrderArgs {
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number;
}

export interface OrderResponse {
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
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/order`,
    credentials: 'include', 
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<OrderResponse[], void>({
      query: () => '/my-orders',
      providesTags: ['Order'],
    }),
    createOrder: builder.mutation<OrderResponse, CreateOrderArgs>({
      query: (data) => ({
        url: '/create-order',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
} = orderApi;
