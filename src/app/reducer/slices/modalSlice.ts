import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'Modal',
  initialState: {
    modalState: false,
  },
  reducers: {
    modalVisibleAction(state, action: PayloadAction<boolean>) {
      state.modalState = action.payload
    },
  },
})

export const { modalVisibleAction } = modalSlice.actions
export default modalSlice.reducer
