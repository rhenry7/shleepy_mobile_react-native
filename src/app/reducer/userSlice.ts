import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string | undefined
  displayName: string | undefined
  email: string | undefined
}

const initialState: User = {
  id: '',
  displayName: '',
  email: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.displayName = action.payload.displayName
      state.email = action.payload.email
      state.id = action.payload.id
    },
    clearCurrentUser: (state) => {
      state.displayName = ''
      state.email = ''
      state.id = ''
    },
  },
})

export const { setCurrentUser, clearCurrentUser } = userSlice.actions

export default userSlice.reducer
