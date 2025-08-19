import { authApi } from "./Features/auth/auth-api";
import { cartApi } from "./Features/cart/cart-api";
import { likeApi } from "./Features/like/like-api";
import { productsApi } from "./products/product-api";
import { orderApi } from "./Features/order/order-api";
import { brandApi } from "./Features/brands/brand-api";
import likeReducer from "./Features/like/like-slice";
import authReducer from "./Features/auth/auth-slice";
import productReducer from "./products/product-slice";
import cartReducer from "./Features/cart/cart-slice";
import orderReducer from "./Features/order/order-slice";
import brandReducer from "./Features/brands/brand-slice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
auth:authReducer,
cart:cartReducer,
like:likeReducer,
product:productReducer,
order:orderReducer,
brand:brandReducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,

  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware, cartApi.middleware, likeApi.middleware, productsApi.middleware, orderApi.middleware, brandApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
