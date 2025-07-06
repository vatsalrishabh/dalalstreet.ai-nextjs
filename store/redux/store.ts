// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from './slices/drawerSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    theme:themeReducer
  },
});

// types for later use
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
