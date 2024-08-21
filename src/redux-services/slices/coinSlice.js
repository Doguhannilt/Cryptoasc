// src/redux-services/slices/coinSlice.js

import { createSlice } from '@reduxjs/toolkit';

const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    selectedCoin: null,
  },
  reducers: {
    selectCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
    clearSelectedCoin: (state) => {
      state.selectedCoin = null;
    },
  },
});

export const { selectCoin, clearSelectedCoin } = coinSlice.actions;
export default coinSlice.reducer;
