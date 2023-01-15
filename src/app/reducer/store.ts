import { configureStore } from '@reduxjs/toolkit'
import soundReducer from './soundSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    sounds: soundReducer,
    user: userSlice,
  },
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
