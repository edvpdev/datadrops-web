import { IProvider } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProvidersState {
  data: IProvider[];
}

const initialState: ProvidersState = {
  data: []
};

export const userProvidersSlice = createSlice({
  name: 'userProviders',
  initialState,
  reducers: {
    setUserProviders: (state, action: PayloadAction<IProvider[]>) => {
      console.log('setUserProviders', action.payload);
      state.data = [...action.payload];
    },
    clearProviders: (state) => {
      state.data = [];
    }
  }
});

export const { setUserProviders, clearProviders } = userProvidersSlice.actions;
export const userProvidersReducer = userProvidersSlice.reducer;
