// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from './slices/drawerSlice';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import stockReducer from './slices/stockSlice';
import tableReducer from './slices/tableSlice';
import screenReducer from './slices/screenSlice';
import queryReducer from './slices/querySlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    theme:themeReducer,
    auth:authReducer,
    stocks: stockReducer,
    table: tableReducer,
     screen: screenReducer, 
    query: queryReducer,
    ui: uiReducer,
  },
});

// types for later use
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
