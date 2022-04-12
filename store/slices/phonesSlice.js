import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [
    {
      "id": 1,
      "value": "+55 84 91234-4321",
      "monthlyPrice": "0.03",
      "setupPrice": "3.40",
      "currency": "U$"
    },
    {
      "id": 2,
      "value": "+55 00 00000-0000",
      "monthlyPrice": "0.00",
      "setupPrice": "0.00",
      "currency": "U$"
    },
    {
      "id": 3,
      "value": "+55 11 11111-1111",
      "monthlyPrice": "0.01",
      "setupPrice": "1.10",
      "currency": "U$"
    },
    {
      "id": 4,
      "value": "+55 22 22222-2222",
      "monthlyPrice": "0.02",
      "setupPrice": "2.20",
      "currency": "U$"
    }
  ]
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
