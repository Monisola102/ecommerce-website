// src/store/Features/brand/brand-api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/brands", // adjust if different
    credentials: "include", // ensures cookies are sent with requests
  }),
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    // GET all brands
    getBrands: builder.query<any, void>({
      query: () => "/",
      providesTags: ["Brand"],
    }),

    // CREATE brand (with logo upload)
    createBrand: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/createbrand",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),

    // UPDATE brand
    updateBrand: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),

    // DELETE brand
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
