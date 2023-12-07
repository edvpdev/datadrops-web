import { IProvider, IProviderEntity } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EntitiesState {
  data: IProviderEntity[];
}

const initialState: EntitiesState = {
  data: []
};

export const userEntitiesSlice = createSlice({
  name: 'userEntities',
  initialState,
  reducers: {
    setUserEntities: (state, action: PayloadAction<IProviderEntity[]>) => {
      state.data = [...action.payload];
    },
    clearProviders: (state) => {
      state.data = [];
    }
  }
});

export const { setUserEntities, clearProviders } = userEntitiesSlice.actions;
export const userEntitiesReducer = userEntitiesSlice.reducer;
