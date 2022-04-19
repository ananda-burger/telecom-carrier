import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '@/api/didNumbers'

const PER_PAGE = 15

const initialState = {
  list: [],
  totalCount: 0,
  isLoading: false,
  isPolling: false,
  currentPhone: {}
}

export const selectPhones = (rootState) => {
  return rootState.phones.list
}

export const selectCurrentPhone = (rootState) => {
  return rootState.phones.currentPhone
}

export const selectIsLoading = (rootState) => {
  return rootState.phones.isLoading
}

export const selectNumberOfPages = (rootState) => {
  return Math.ceil(rootState.phones.totalCount / PER_PAGE)
}

export const fetch = createAsyncThunk(
  'phones/fetch',
  ({ page }) => {
    return api.fetchNumbers({ page, perPage: PER_PAGE })
  },
  {
    condition: (_, { getState }) => {
      return !getState().phones.isLoading
    }
  }
)

export const poll = createAsyncThunk(
  'phones/poll',
  ({ page }) => {
    return api.fetchNumbers({ page, perPage: PER_PAGE })
  },
  {
    condition: (_, { getState }) => {
      return !getState().phones.isPolling
    }
  }
)

export const add = createAsyncThunk('phones/add', (phone) => {
  return api.addNumber(phone)
})

export const edit = createAsyncThunk('phones/edit', (phone) => {
  return api.editNumber(phone)
})

export const remove = createAsyncThunk('phones/remove', async ({ id, page }, { dispatch }) => {
  const result = await api.removeNumbers(id)
  dispatch(fetch({ page }))
  return result
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
      .addCase(fetch.rejected, (state, _action) => {
        state.isLoading = false
      })

      .addCase(poll.fulfilled, (state, action) => {
        state.list = action.payload.phones
        state.totalCount = action.payload.totalCount
        state.isPolling = false
      })
      .addCase(poll.pending, (state, _action) => {
        state.isPolling = true
      })
      .addCase(poll.rejected, (state, _action) => {
        state.isPolling = false
      })

      .addCase(remove.fulfilled, (state, _action) => {
        state.totalCount -= 1
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
        state.currentPhone = action.payload
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
