import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Audio } from 'expo-av'

export const soundSlice = createSlice({
  name: 'sound slice',
  initialState: {
    sound: false,
    spaceSound: false,
  },
  reducers: {
    soundToggled(state, action: PayloadAction<boolean>) {
      state.sound = action.payload
    },
    spaceSound(state, action: PayloadAction<boolean>) {
      state.sound = action.payload
    },
  },
})

export const { soundToggled, spaceSound } = soundSlice.actions
export default soundSlice.reducer
