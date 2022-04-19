import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { config as defaultStore } from '@/store/config'
import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender } from '@testing-library/react'

const createMockRouter = (router) => {
  return {
    query: {},
    isReady: true,
    isFallback: false,
    back: jest.fn(),
    beforePopState: jest.fn(),
    ...router
  }
}

const render = (ui, { router = {}, store = {}, ...renderOptions } = {}) => {
  function Wrapper({ children }) {
    return (
      <Provider store={configureStore({ ...defaultStore, ...store })}>
        <RouterContext.Provider value={createMockRouter(router)}>{children}</RouterContext.Provider>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

// Override testing-library/react 'render' function.
export { render }
