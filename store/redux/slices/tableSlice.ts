
// store/redux/slices/tableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableState {
  query: string;
  title: string;
  count: number;
}

const initialState: TableState = {
  query: 'market_capitalization > 10000', // default query
  title: 'Top Stocks',
  count: 10,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setStockParams: (state, action: PayloadAction<TableState>) => {
      state.query = action.payload.query;
      state.title = action.payload.title;
      state.count = action.payload.count;
    },
  },
});

export const { setStockParams } = tableSlice.actions;
export default tableSlice.reducer;
