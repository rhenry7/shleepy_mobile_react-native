import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './slices/modalSlice'
import soundReducer from './slices/soundSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    sounds: soundReducer,
    user: userSlice, // authentication
    modal: modalSlice,
  },
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
