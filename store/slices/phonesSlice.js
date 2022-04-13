import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../service/mockApi'

const initialState = {
  list: []
}

export const selectPhones = (rootState) => {
  return rootState.phones.list
}

export const fetch = createAsyncThunk(
  'phones/fetch',
  () => {
    return api.fetchNumbers()
  }
)

const slice = createSlice({
  name: 'phonesSlice',
  initialState,
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(fetch.pending, (_state, _action) => {
        //TODO: spinner while loading phones
      })
      .addCase(fetch.rejected, (_state, action) => {
        console.log(action.error)
      })
  }
})

export const { add } = slice.actions

export const { reducer } = slice
