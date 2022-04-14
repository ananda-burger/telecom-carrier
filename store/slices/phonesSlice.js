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

export const add = createAsyncThunk(
  'phones/add',
  (phone) => {
    return api.addNumber(phone)
  }
)

export const remove = createAsyncThunk(
  'phones/remove',
  (id) => {
    return api.removeNumbers(id)
  }
)

const slice = createSlice({
  name: 'phonesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(fetch.pending, (_state, _action) => {
        // TODO: spinner while loading phones
      })
      .addCase(fetch.rejected, (_state, action) => {
        console.log(action.error)
      })

      .addCase(remove.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload)
        state.list.splice(index, 1)
      })
      .addCase(remove.pending, (_state, _action) => {
        // TODO: spinner
      })
      .addCase(remove.rejected, (_state, action) => {
        console.log(action.error)
      })

      .addCase(add.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(add.pending, (_state, _action) => {
        // TODO: disable form
      })
      .addCase(add.rejected, (_state, action) => {
        // TODO: display error message
        console.log(action.error)
      })
  }
})

export const { reducer } = slice
