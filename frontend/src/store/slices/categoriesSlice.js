import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { categoriesApi } from '../../services/api'

export const fetchCategories = createAsyncThunk('categories/fetchAll', () => categoriesApi.getAll())

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    selected: 'all',
    loading: false,
    error: null,
  },
  reducers: {
    setSelected: (state, action) => { state.selected = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
  },
})

export const { setSelected } = categoriesSlice.actions
export default categoriesSlice.reducer
