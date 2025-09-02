// src/store/Features/brand/brand-api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands`,
    credentials: "include",
  }),
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getBrands: builder.query<any, void>({
      query: () => "/",
      providesTags: ["Brand"],
    }),

    createBrand: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/createbrand",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
