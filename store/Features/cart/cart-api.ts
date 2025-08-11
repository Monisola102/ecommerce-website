import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  size: string;
  _id: string;
}

export interface Cart {
  _id: string;
  user: string;
  updatedCart: CartItem[];      
  totalQuantity: number;      
  totalPrice: number;          
}

interface AddToCartRequest {
  productId: string;
  quantity: number;
  size: string;
}

interface SubtractFromCartRequest {
  productId: string;
  size: string;
}

interface DeleteFromCartRequest {
  productId: string;
  size: string;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts`,
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => "/getCart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<Cart, AddToCartRequest>({
      query: (body) => ({
        url: "/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    subtractFromCart: builder.mutation<Cart, SubtractFromCartRequest>({
      query: (body) => ({
        url: "/subtract",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteFromCart: builder.mutation<Cart, DeleteFromCartRequest>({
      query: ({ productId, size }) => ({
        url: `/delete/${productId}?size=${size}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<Cart, void>({
      query: () => ({
        url: "/clearCart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useSubtractFromCartMutation,
  useDeleteFromCartMutation,
  useClearCartMutation,
} = cartApi;
