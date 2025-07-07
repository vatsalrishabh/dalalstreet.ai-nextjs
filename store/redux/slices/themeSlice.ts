// store/redux/slices/themeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// DaisyUI built-in + custom themes
export type ThemeType =
  | 'light'
  | 'dark'
  | 'blue'
  | 'corporate'
  | 'synthwave'
  | 'forest'
  | 'luxury'
  | 'dracula'
  | 'maroon'
  | 'custom-ameesh'; // auto suggested theme types

interface ThemeState {
  mode: ThemeType;
}

const initialState: ThemeState = {
  mode: 'dark',
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
