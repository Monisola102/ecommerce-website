import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrandState {
  selectedBrandId: string | null;
  modalOpen: boolean;
}

const initialState: BrandState = {
  selectedBrandId: null,
  modalOpen: false,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setSelectedBrand: (state, action: PayloadAction<string | null>) => {
      state.selectedBrandId = action.payload;
    },
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
  },
});

export const { setSelectedBrand, openModal, closeModal } = brandSlice.actions;
export default brandSlice.reducer;
