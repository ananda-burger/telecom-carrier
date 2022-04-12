import { configureStore } from '@reduxjs/toolkit'

import { reducer as phonesReducer } from './slices/phonesSlice'

export const store = configureStore({
  reducer: {
    phones: phonesReducer
  }
})
