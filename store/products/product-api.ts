import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Size {
  size: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  image: string;
  sizes: Size[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductResponse,
      { page?: number; limit?: number; search?: string; category?: string; sort?: string }
    >({
      query: ({ page = 1, limit = 10, search = "", category = "", sort = "" }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("limit", limit.toString());
        if (search) params.set("search", search);
        if (category) params.set("category", category);
        if (sort) params.set("sort", sort);
        return `?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
