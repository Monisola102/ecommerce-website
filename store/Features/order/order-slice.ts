import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderUIState {
  selectedOrderId: string | null;
  filterStatus: string;
}

const initialState: OrderUIState = {
  selectedOrderId: null,
  filterStatus: 'All',
};

const orderSlice = createSlice({
  name: 'orderUI',
  initialState,
  reducers: {
    setSelectedOrderId(state, action: PayloadAction<string | null>) {
      state.selectedOrderId = action.payload;
    },
    setFilterStatus(state, action: PayloadAction<string>) {
      state.filterStatus = action.payload;
    },
  },
});

export const { setSelectedOrderId, setFilterStatus } = orderSlice.actions;

export default orderSlice.reducer;
