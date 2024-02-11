import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ConfirmModalState {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
}

const initialState: ConfirmModalState = {
  isOpen: false,
  message: '',
  onConfirm: null,
  onCancel: null
};

export const confirmModalSlice = createSlice({
  name: 'confirmationModal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<Omit<ConfirmModalState, 'isOpen'>>
    ) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.onConfirm = action.payload.onConfirm;
      state.onCancel = action.payload.onCancel;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.message = '';
      state.onConfirm = null;
      state.onCancel = null;
    }
  }
});

export const { openModal, closeModal } = confirmModalSlice.actions;
export const confirmModalReducer = confirmModalSlice.reducer;
