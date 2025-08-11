import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
  likedProductIds: string[];
}

const initialState: LikeState = {
  likedProductIds: [],
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikedProducts(state, action: PayloadAction<string[]>) {
      state.likedProductIds = action.payload;
    },
    toggleLike(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const index = state.likedProductIds.indexOf(productId);
      if (index > -1) {
        state.likedProductIds.splice(index, 1); 
      } else {
        state.likedProductIds.push(productId); 
      }
    },
    clearLikes(state) {
      state.likedProductIds = [];
    },
  },
});

export const { setLikedProducts, toggleLike, clearLikes } = likeSlice.actions;
export default likeSlice.reducer;
