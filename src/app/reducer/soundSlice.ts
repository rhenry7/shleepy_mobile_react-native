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
    spaceSoundAction(state, action: PayloadAction<boolean>) {
      state.spaceSound = action.payload
    },
    rainSoundAction(state, action: PayloadAction<boolean>) {
      state.rainSound = action.payload
    },
    windSoundAction(state, action: PayloadAction<boolean>) {
      state.windSound = action.payload
    },
    seagullsSoundAction(state, action: PayloadAction<boolean>) {
      state.seagullsSound = action.payload
    },
  },
})

export const {
  soundToggled,
  spaceSoundAction,
  rainSoundAction,
  windSoundAction,
  seagullsSoundAction,
} = soundSlice.actions
export default soundSlice.reducer
