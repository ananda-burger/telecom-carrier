import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../service/mockApi'

const initialState = {
  list: [],
  totalCount: 0
}

export const selectPhones = (rootState) => {
  return rootState.phones.list
}

export const selectTotalCount = (rootState) => {
  return rootState.phones.totalCount
}

export const fetch = createAsyncThunk(
  'phones/fetch',
  ({ page }) => {
    return api.fetchNumbers({ page })
  }
)

export const add = createAsyncThunk(
  'phones/add',
  (phone) => {
    return api.addNumber(phone)
  }
)

export const edit = createAsyncThunk(
  'phones/edit',
  (phone) => {
    return api.editNumber(phone)
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
        state.list = action.payload.phones
        state.totalCount = action.payload.totalCount
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
        state.totalCount -= 1
      })
      .addCase(remove.pending, (_state, _action) => {
        // TODO: spinner
      })
      .addCase(remove.rejected, (_state, action) => {
        console.log(action.error)
      })

      .addCase(add.fulfilled, (state, action) => {
        state.list.push(action.payload)
        state.totalCount += 1
      })
      .addCase(add.pending, (_state, _action) => {
        // TODO: disable form
      })
      .addCase(add.rejected, (_state, action) => {
        // TODO: display error message
        console.log(action.error)
      })

      .addCase(edit.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(edit.pending, (_state, _action) => {
        // TODO: disable form
      })
      .addCase(edit.rejected, (_state, action) => {
        // TODO: display error message
        console.log(action.error)
      })
  }
})

export const { reducer } = slice
