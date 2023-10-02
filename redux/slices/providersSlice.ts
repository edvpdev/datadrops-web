import { createSlice } from '@reduxjs/toolkit';

interface ProvidersState {
  data: [];
}

const initialState: ProvidersState = {
  data: []
};

export const providersSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    setProviders: (state) => {
      state.data = state.data;
    },
    clearProviders: (state) => {
      state.data = [];
    }
  }
});

export const { setProviders, clearProviders } = providersSlice.actions;
export const providersReducer = providersSlice.reducer;
