import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductFilterState {
  search: string;
  category: string;
  sort: string;
  page: number;
  limit: number;
}

const initialState: ProductFilterState = {
  search: "",
  category: "",
  sort: "",
  page: 1,
  limit: 10,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    resetFilters(state) {
      state.search = "";
      state.category = "";
      state.sort = "";
      state.page = 1;
      state.limit = 10;
    },
  },
});

export const {
  setSearch,
  setCategory,
  setSort,
  setPage,
  setLimit,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
