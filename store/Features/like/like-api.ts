import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  brand?: string;
  category?: string;
  description?: string;
}

interface AddFavoriteRequest {
  productId: string;
}

interface RemoveFavoriteRequest {
  productId: string;
}

interface FavoritesResponse {
  message: string;
  favorites: Product[];
}

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({
    baseUrl:`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, 
    credentials: "include", 
  }),
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getFavorites: builder.query<Product[], void>({
      query: () => "/favorites",
      providesTags: ["Favorites"],
      transformResponse: (response: FavoritesResponse) => response.favorites,
    }),

    addFavorite: builder.mutation<FavoritesResponse, string>({
      query: (productId: string): { url: string; method: string; body: AddFavoriteRequest } => ({
        url: "/add-favorite",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Favorites"],
    }),

    removeFavorite: builder.mutation<FavoritesResponse, string>({
      query: (productId: string): { url: string; method: string; body: RemoveFavoriteRequest } => ({
        url: "/remove-favorite",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = likeApi;
