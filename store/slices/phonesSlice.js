import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

export const selectPhones = (rootState) => {
  return rootState.phones.list
}

const slice = createSlice({
  name: 'phonesSlice',
  initialState,
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload)
    }
  }
})

export const { add } = slice.actions

export const { reducer } = slice
