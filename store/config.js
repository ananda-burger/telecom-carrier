import { configureStore } from '@reduxjs/toolkit'

import { reducer as phonesReducer } from '@/store/slices/phonesSlice'

export const store = configureStore({
  reducer: {
    phones: phonesReducer
  }
})
