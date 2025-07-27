// store/redux/slices/uiSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePanel: "chat",
  panelWidth: 400,
  isResizing: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActivePanel(state, action) {
      state.activePanel = action.payload;
    },
    setPanelWidth(state, action) {
      state.panelWidth = action.payload;
    },
    setIsResizing(state, action) {
      state.isResizing = action.payload;
    },
  },
});

export const { setActivePanel, setPanelWidth, setIsResizing } = uiSlice.actions;
export default uiSlice.reducer;
