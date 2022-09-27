import { createSlice } from '@reduxjs/toolkit'
import { Audio } from 'expo-av'

const soundSlice = createSlice({
  name: 'sound slice',
  initialState: {
    soundState: 'nosound',
  },
  reducers: {
    // todoAdded(state, action) {
    //   state.push({
    //     id: action.payload.id,
    //     text: action.payload.text,
    //     completed: false
    //   })
    //   },
    soundToggled(state) {
      //   const todo = state.find((todo) => todo.id === action.payload)
      //   todo.completed = !todo.completed
      if (state.soundState === 'nosound') {
        ;(async () => {
          const { sound } = await Audio.Sound.createAsync(
            require('../../sounds/ambient/Deep_Space.wav'),
            {
              shouldPlay: true,
              volume: 0.25,
              isLooping: true,
            },
          )
          this.sound = sound
        })()
        return {
          ...state,
          soundState: 'playing',
        }
      }
    },
  },
})

export const { soundToggled } = soundSlice.actions
export default soundSlice.reducer
