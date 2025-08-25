import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  brand?: string | { _id: string; name: string };
  category?: string;
  description?: string;
  sizes?: { size: string; stock: number }[];
}

export interface Favorite {
  _id: string;              // Favorite document ID
  product: Product;
  size: string;
}

interface FavoritesResponse {
  message: string;
  favorite?: Favorite;       // For add/remove single favorite
  favorites?: Favorite[];    // For getFavorites
}

interface AddFavoriteRequest {
  productId: string;
  size?: string;
}

interface RemoveFavoriteRequest {
  productId: string;
  size?: string;
}

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
    credentials: "include",
  }),
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getFavorites: builder.query<Favorite[], void>({
      query: () => "/favorites",
      providesTags: ["Favorites"],
      transformResponse: (response: FavoritesResponse) => response.favorites || [],
    }),

    addFavorite: builder.mutation<Favorite, AddFavoriteRequest>({
      query: ({ productId, size }) => ({
        url: "/add-favorite",
        method: "POST",
        body: { productId, size },
      }),
      invalidatesTags: ["Favorites"],
      transformResponse: (response: FavoritesResponse) => response.favorite as Favorite,
    }),

    removeFavorite: builder.mutation<Favorite, RemoveFavoriteRequest>({
      query: ({ productId, size }) => ({
        url: "/remove-favorite",
        method: "POST",
        body: { productId, size },
      }),
      invalidatesTags: ["Favorites"],
      transformResponse: (response: FavoritesResponse) => response.favorite as Favorite,
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = likeApi;
