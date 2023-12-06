import { SynchronizationsOverview } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SynchronizationState {
  data: SynchronizationsOverview | null;
}

const initialState: SynchronizationState = {
  data: null
};

export const syncsOverviewSlice = createSlice({
  name: 'syncsOverview',
  initialState,
  reducers: {
    setSyncsOverview: (
      state,
      action: PayloadAction<SynchronizationsOverview>
    ) => {
      state.data = action.payload;
    }
  }
});

export const { setSyncsOverview } = syncsOverviewSlice.actions;
export const syncOverviewReducer = syncsOverviewSlice.reducer;
