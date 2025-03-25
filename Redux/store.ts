import { configureStore } from '@reduxjs/toolkit'
import { expensesApi } from './slices/expensesApiSlice'
import { ordersApi } from './slices/ordersApiSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      [expensesApi.reducerPath]:expensesApi.reducer,
      [ordersApi.reducerPath]:ordersApi.reducer
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(expensesApi.middleware, ordersApi.middleware);
  },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']