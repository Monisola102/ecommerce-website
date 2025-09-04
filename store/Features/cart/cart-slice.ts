import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  isOpen: boolean;
}

const initialState: CartState = {
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
     clearCartState(state) {
      state.isOpen = false;
    },
  },
});

export const { openCart, closeCart, clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
