import { ISynchronization } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SynchronizationState {
  data: ISynchronization[];
}

const initialState: SynchronizationState = {
  data: []
};

export const syncsSlice = createSlice({
  name: 'userSyncs',
  initialState,
  reducers: {
    setSyncs: (state, action: PayloadAction<ISynchronization[]>) => {
      state.data = action.payload;
    }
  }
});

export const { setSyncs } = syncsSlice.actions;
export const userSyncsReducer = syncsSlice.reducer;
