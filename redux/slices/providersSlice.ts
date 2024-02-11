import { IProvider, IProviderWithStatus } from '@/lib/types';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

interface ProvidersState {
  data: IProviderWithStatus[];
}

const initialState: ProvidersState = {
  data: []
};

export const selectActiveProviders = createSelector(
  (state: RootState) => state.userProviders.data,
  (userProviders: IProviderWithStatus[]) =>
    userProviders.filter((p) => p.isBlocked)
);

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
