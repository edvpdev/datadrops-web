import { IProvider, IProviderWithStatus } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProvidersState {
  data: IProviderWithStatus[];
}

const initialState: ProvidersState = {
  data: []
};

export const userProvidersSlice = createSlice({
  name: 'userProviders',
  initialState,
  reducers: {
    setUserProviders: (state, action: PayloadAction<IProviderWithStatus[]>) => {
      state.data = [...action.payload];
    },
    clearProviders: (state) => {
      state.data = [];
    }
  }
});

export const { setUserProviders, clearProviders } = userProvidersSlice.actions;
export const userProvidersReducer = userProvidersSlice.reducer;
