import { configureStore } from '@reduxjs/toolkit'
import count from './reducers/demo'

export const store = configureStore({
  reducer: {
    count : count
  },
})

export default store;