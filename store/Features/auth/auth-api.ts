import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  shippingAddress?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  shippingAddress?: string;
}

interface Payment {
  _id: string;
  amount: number;
  paymentMethod: string;
  createdAt: string;
  status: "pending" | "paid" | "failed";
  order?: string;
}
interface OrderSummary {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
}

 interface UserDashboardResponse {
  name: string;
  email: string;
  shippingAddress: string | null;
  recentOrders: OrderSummary[];
  favoritesCount: number;
  cartCount: number;
}


export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
    credentials: "include",
  }),
  tagTypes: ["User", "Payments"], 
  endpoints: (builder) => ({
    signup: builder.mutation<User, SignupRequest>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], 
    }),

    login: builder.mutation<User, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    fetchUser: builder.query<{data: User}, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["User"], 
    }),

    updateUserProfile: builder.mutation<User, UpdateProfileRequest>({
      query: (body) => ({
        url: "/update-profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getUserPayments: builder.query<Payment[], void>({
  query: () => ({
    url: "/payments",
    method: "GET",
  }),
  transformResponse: (response: { data: Payment[] }) => response.data,
  providesTags: ["Payments"],
}),
     createPayment: builder.mutation<
      Payment,
      { order: string; amount: number; paymentMethod: string; status: string; }
    >({
      query: (body) => ({
        url: "/create-payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments"],
    }),

    fetchUserDashboard:builder.query<UserDashboardResponse,void>({
 query: () => ({
        url: "/dashboard",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],

    })
  }),
  
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useFetchUserQuery,
  useUpdateUserProfileMutation,
  useGetUserPaymentsQuery,
  useFetchUserDashboardQuery,
} = authApi;
