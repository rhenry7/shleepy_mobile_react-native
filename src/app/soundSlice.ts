import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Audio } from 'expo-av'

const soundSlice = createSlice({
  name: 'sound slice',
  initialState: {
    soundState: '',
  },
  reducers: {
    soundToggled(state, action: PayloadAction<string>) {
      state.soundState = action.payload
    },
  },
})

export const { soundToggled } = soundSlice.actions
export default soundSlice.reducer
