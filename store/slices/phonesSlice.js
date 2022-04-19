import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../service/mockApi'

const PER_PAGE = 15

const initialState = {
  list: [],
  totalCount: 0,
  isLoading: false,
  form: {
    currentPhone: {}
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

export const selectCurrentPhone = (rootState) => {
  return rootState.phones.form.currentPhone
}

export const fetch = createAsyncThunk(
  'phones/fetch',
  ({ page }) => {
    return api.fetchNumbers({ page, perPage: PER_PAGE })
  },
  {
    condition: ({ isPolling }, { getState }) => {
      return !(isPolling && getState().phones.isLoading)
    }
  }
)

export const add = createAsyncThunk('phones/add', (phone) => {
  return api.addNumber(phone)
})

export const edit = createAsyncThunk('phones/edit', (phone) => {
  return api.editNumber(phone)
})

export const remove = createAsyncThunk('phones/remove', (id) => {
  return api.removeNumbers(id)
})

export const find = createAsyncThunk('phones/find', (id) => {
  return api.findNumber(id)
})

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
        const index = state.list.findIndex((p) => p.id === action.payload)
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
        if (state.list.length < PER_PAGE) {
          state.list.push(action.payload)
        }
        state.totalCount += 1
      })

      .addCase(edit.fulfilled, (state, { payload }) => {
        const index = state.list.findIndex((p) => p.id === payload.id)

        if (index >= 0) {
          state.list[index] = payload
        }
      })

      .addCase(find.fulfilled, (state, action) => {
        state.form.currentPhone = action.payload
        state.isLoading = false
      })
      .addCase(find.pending, (state, _action) => {
        state.isLoading = true
      })
      .addCase(find.rejected, (state, _action) => {
        state.isLoading = false
      })
  }
})

export const { reducer } = slice
