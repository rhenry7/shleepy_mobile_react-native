import { configureStore } from '@reduxjs/toolkit'
import soundsReducer from './soundSlice'
//import filtersReducer from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    sounds: soundsReducer,
    //filters: filtersReducer
  },
})
