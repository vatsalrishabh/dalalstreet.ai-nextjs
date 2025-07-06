// store/redux/slices/themeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// DaisyUI built-in + custom themes
export type ThemeType =
  | 'light'
  | 'dark'
  | 'corporate'
  | 'synthwave'
  | 'forest'
  | 'luxury'
  | 'dracula'
  | 'maroon'
  | 'custom-ameesh';

interface ThemeState {
  mode: ThemeType;
}

const initialState: ThemeState = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.mode = action.payload;
    },
    cycleThemes: (state) => {
      const themeOrder: ThemeType[] = [
        'light',
        'dark',
        'corporate',
        'synthwave',
        'forest',
        'luxury',
        'dracula',
      ];
      const currentIndex = themeOrder.indexOf(state.mode);
      state.mode = themeOrder[(currentIndex + 1) % themeOrder.length];
    },
  },
});

export const { setTheme, cycleThemes } = themeSlice.actions;
export default themeSlice.reducer;
