import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import soundsReducer from './soundSlice'
import { composeWithDevTools } from '@redux-devtools/extension'

export const store = configureStore({
  reducer: {
    sounds: soundsReducer,
  },
  //devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
