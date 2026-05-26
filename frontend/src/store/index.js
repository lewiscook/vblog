import { configureStore } from '@reduxjs/toolkit'
import videosReducer from './slices/videosSlice'
import categoriesReducer from './slices/categoriesSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    categories: categoriesReducer,
    ui: uiReducer,
  },
})
