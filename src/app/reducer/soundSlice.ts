import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Audio } from 'expo-av'

export const soundSlice = createSlice({
  name: 'sound slice',
  initialState: {
    sound: false,
    spaceSound: false,
    rainSound: false,
    windSound: false,
    seagullsSound: false,
  },
  reducers: {
    soundToggled(state, action: PayloadAction<boolean>) {
      state.sound = action.payload
    },
    spaceSound(state, action: PayloadAction<boolean>) {
      state.spaceSound = action.payload
    },
    rainSound(state, action: PayloadAction<boolean>) {
      state.rainSound = action.payload
    },
    windSound(state, action: PayloadAction<boolean>) {
      state.windSound = action.payload
    },
    seagullsSound(state, action: PayloadAction<boolean>) {
      state.seagullsSound = action.payload
    },
  },
})

export const {
  soundToggled,
  spaceSound,
  rainSound,
  windSound,
  seagullsSound,
} = soundSlice.actions
export default soundSlice.reducer
