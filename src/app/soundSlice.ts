import { createSlice } from '@reduxjs/toolkit'

const soundSlice = createSlice({
  name: 'sound slice',
  initialState: null,
  reducers: {
    // todoAdded(state, action) {
    //   state.push({
    //     id: action.payload.id,
    //     text: action.payload.text,
    //     completed: false
    //   })
    //   },
    todoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload)
      //todo.completed = !todo.completed
    },
  },
})

export const { todoToggled } = soundSlice.actions
export default soundSlice.reducer
