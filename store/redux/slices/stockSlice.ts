import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStockScreenResults } from '@/services/stockServices';
import { StockRaw } from '@/models/stock.model';

interface StockState {
  data: StockRaw[];
  loading: boolean;
  error: string | null;
}

const initialState: StockState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchStocks = createAsyncThunk(
  'stocks/fetchStocks',
  async ({ token, query }: { token: string; query: string }, thunkAPI) => {
    try {
      const res = await getStockScreenResults(token, query);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Error fetching stocks');
    }
  }
);

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default stockSlice.reducer;
