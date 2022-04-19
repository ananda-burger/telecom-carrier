import { configureStore } from '@reduxjs/toolkit'

import { reducer as phonesReducer } from '@/store/slices/phonesSlice'

export const config = {
  reducer: {
    phones: phonesReducer
  }
}

export const store = configureStore(config)
