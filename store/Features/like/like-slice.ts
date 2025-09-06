import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
  likedProductIds: string[];
}

const initialState: LikeState = {
  likedProductIds: [],
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikedProducts: (state, action: PayloadAction<string[]>) => {
      state.likedProductIds = action.payload;
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      if (state.likedProductIds.includes(action.payload)) {
        state.likedProductIds = state.likedProductIds.filter(id => id !== action.payload);
      } else {
        state.likedProductIds.push(action.payload);
      }
    },
    clearLikes: (state) => {
      state.likedProductIds = [];
    },
  },
});

export const { setLikedProducts, toggleLike , clearLikes} = likeSlice.actions;
export default likeSlice.reducer;
