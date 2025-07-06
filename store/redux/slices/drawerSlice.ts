// store/slices/drawerSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface DrawerState {
  isLeftDrawerOneOpen: boolean;
  isLeftDrawerTwoOpen: boolean;
  isRightDrawerOpen: boolean;
}

const initialState: DrawerState = {
  isLeftDrawerOneOpen: false,
  isLeftDrawerTwoOpen: false,
  isRightDrawerOpen: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    // Left Drawer One
    toggleLeftDrawerOne: (state) => {
      state.isLeftDrawerOneOpen = !state.isLeftDrawerOneOpen;
      state.isLeftDrawerTwoOpen = false;
    },
    closeLeftDrawerOne: (state) => {
      state.isLeftDrawerOneOpen = false;
    },
    openLeftDrawerOne: (state) => {
      state.isLeftDrawerOneOpen = true;
      state.isLeftDrawerTwoOpen = false;
    },

    // Left Drawer Two
    toggleLeftDrawerTwo: (state) => {
      state.isLeftDrawerTwoOpen = !state.isLeftDrawerTwoOpen;
      state.isLeftDrawerOneOpen = false;
    },
    closeLeftDrawerTwo: (state) => {
      state.isLeftDrawerTwoOpen = false;
    },
    openLeftDrawerTwo: (state) => {
      state.isLeftDrawerTwoOpen = true;
      state.isLeftDrawerOneOpen = false;
    },

    // Right Drawer (independent)
    toggleRightDrawer: (state) => {
      state.isRightDrawerOpen = !state.isRightDrawerOpen;
    },
    closeRightDrawer: (state) => {
      state.isRightDrawerOpen = false;
    },
    openRightDrawer: (state) => {
      state.isRightDrawerOpen = true;
    },
  },
});

export const {
  toggleLeftDrawerOne,
  closeLeftDrawerOne,
  openLeftDrawerOne,
  toggleLeftDrawerTwo,
  closeLeftDrawerTwo,
  openLeftDrawerTwo,
  toggleRightDrawer,
  closeRightDrawer,
  openRightDrawer,
} = drawerSlice.actions;

export default drawerSlice.reducer;
