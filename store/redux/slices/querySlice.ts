// store/redux/slices/querySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QueryState {
  latestQuery: string | null;
}

const initialState: QueryState = {
  latestQuery: null,
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setLatestQuery(state, action: PayloadAction<string>) {
      state.latestQuery = action.payload;
    },
  },
});

export const { setLatestQuery } = querySlice.actions;
export default querySlice.reducer;
