import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quizzies: []
}

export const counterSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizzies: (state, action) => {
        state.quizzies = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setQuizzies } = counterSlice.actions

export default counterSlice.reducer