import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../service/mockApi'

const PER_PAGE = 20

const initialState = {
  list: [],
  totalCount: 0,
  isLoading: false,
  form: {
    isSubmitting: false,
  }
}

export const selectPhones = (rootState) => {
  return rootState.phones.list
}

export const selectIsLoading = (rootState) => {
  return rootState.phones.isLoading
}

export const selectNumberOfPages = (rootState) => {
  return Math.ceil(rootState.phones.totalCount / PER_PAGE)
}

export const selectIsSubmitting = (rootState) => {
  return rootState.phones.form.isSubmitting
}

export const fetch = createAsyncThunk(
  'phones/fetch',
  ({ page }) => {
    return api.fetchNumbers({ page, perPage: PER_PAGE })
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
        state.isLoading = false
      })
      .addCase(fetch.pending, (state, _action) => {
        state.isLoading = true
      })
      .addCase(fetch.rejected, (state, action) => {
        state.isLoading = false
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
        state.form.isSubmitting = false
      })
      .addCase(add.pending, (state, _action) => {
        // TODO: disable form
        state.form.isSubmitting = true
      })
      .addCase(add.rejected, (state, action) => {
        // TODO: display error message
        state.form.isSubmitting = false
        console.log(action.error)
      })

      .addCase(edit.fulfilled, (state, action) => {
        state.list = action.payload
        state.form.isSubmitting = false
      })
      .addCase(edit.pending, (state, _action) => {
        // TODO: disable form
        state.form.isSubmitting = true
      })
      .addCase(edit.rejected, (state, action) => {
        // TODO: display error message
        state.form.isSubmitting = false
        console.log(action.error)
      })
  }
})

export const { reducer } = slice
