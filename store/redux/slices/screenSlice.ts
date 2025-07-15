// store/redux/slices/screenSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Screen = 'screens' | 'charts' | 'chatbot';

interface ScreenState {
  currentScreen: Screen;
}

const initialState: ScreenState = {
  currentScreen: 'screens',
};

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreen(state, action: PayloadAction<Screen>) {
      state.currentScreen = action.payload;
    },
  },
});

export const { setScreen } = screenSlice.actions;
export default screenSlice.reducer;
