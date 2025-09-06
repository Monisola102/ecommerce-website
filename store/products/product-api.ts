import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Size {
  size: string;
  stock: number;
}
export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
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
export interface ReviewRequest {
  rating: number;
  comment: string;
}
export interface SingleProductResponse {
  success: boolean;
  message: string;
  data: Product;
}
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
   credentials: "include",
  }),
  tagTypes: ["Reviews"], 

  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        sort?: string;
        brand?: string;
        order?: "asc" | "desc";
      }
    >({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        category = "",
        brand = "",
        minPrice,
        maxPrice,
        sort = "createdAt",
        order = "desc",
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("limit", limit.toString());
        if (search) params.set("search", search);
        if (category) params.set("category", category);
        if (sort) params.set("sort", sort);
        if (brand) params.set("brand", brand);
        if (minPrice !== undefined) params.set("minPrice", minPrice.toString());
        if (maxPrice !== undefined) params.set("maxPrice", maxPrice.toString());
        if (order) params.set("order", order);

        return `?${params.toString()}`;
      },
    }),
    getProductById: builder.query<SingleProductResponse, string>({
      query: (id) => `/${id}`,
    }),
    getReviews: builder.query<Review[], string>({
      query: (productId) => `/${productId}/reviews`,
      providesTags: (result, error, productId) => [
        { type: "Reviews", id: `PRODUCT-${productId}` },
      ],
    }),
    addReview: builder.mutation<
      Review,
      { productId: string; review: ReviewRequest }
    >({
      query: ({ productId, review }) => ({
        url: `/${productId}/reviews`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: `PRODUCT-${productId}` },
      ],
    }),
    updateReview: builder.mutation<
      Review,
      { productId: string; reviewId: string; review: ReviewRequest }
    >({
      query: ({ productId, reviewId, review }) => ({
        url: `/${productId}/reviews/${reviewId}`,
        method: "PUT",
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: `PRODUCT-${productId}` },
      ],
    }),
    deleteReview: builder.mutation<
      void,
      { productId: string; reviewId: string }
    >({
      query: ({ productId, reviewId }) => ({
        url: `/${productId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: `PRODUCT-${productId}` },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = productsApi;
