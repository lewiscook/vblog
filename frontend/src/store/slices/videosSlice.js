import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { videosApi, searchApi } from '../../services/api'

export const fetchVideos = createAsyncThunk('videos/fetchAll', (params) => videosApi.getAll(params))
export const fetchFeatured = createAsyncThunk('videos/fetchFeatured', () => videosApi.getFeatured())
export const fetchVideoById = createAsyncThunk('videos/fetchById', (id) => videosApi.getById(id))
export const fetchRelated = createAsyncThunk('videos/fetchRelated', (id) => videosApi.getRelated(id))
export const viewVideo = createAsyncThunk('videos/view', (id) => videosApi.view(id).then(data => ({ id, views: data.views })))
export const likeVideo = createAsyncThunk('videos/like', (id) => videosApi.like(id).then(data => ({ id, likes: data.likes })))
export const searchVideos = createAsyncThunk('videos/search', (params) => searchApi.search(params))

const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    items: [],
    featured: [],
    current: null,
    related: [],
    searchResults: [],
    searchQuery: '',
    pagination: { page: 1, limit: 12, total: 0, totalPages: 0 },
    loading: false,
    currentLoading: false,
    searchLoading: false,
    error: null,
    likedIds: [],
  },
  reducers: {
    clearCurrent: (state) => { state.current = null; state.related = [] },
    clearSearch: (state) => { state.searchResults = []; state.searchQuery = '' },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.videos
        state.pagination = action.payload.pagination
      })
      .addCase(fetchVideos.rejected, (state, action) => { state.loading = false; state.error = action.error.message })

      .addCase(fetchFeatured.fulfilled, (state, action) => { state.featured = action.payload })

      .addCase(fetchVideoById.pending, (state) => { state.currentLoading = true })
      .addCase(fetchVideoById.fulfilled, (state, action) => { state.currentLoading = false; state.current = action.payload })
      .addCase(fetchVideoById.rejected, (state, action) => { state.currentLoading = false; state.error = action.error.message })

      .addCase(fetchRelated.fulfilled, (state, action) => { state.related = action.payload })

      .addCase(viewVideo.fulfilled, (state, action) => {
        const { id, views } = action.payload
        if (state.current?.id === id) state.current.views = views
        const item = state.items.find(v => v.id === id)
        if (item) item.views = views
      })

      .addCase(likeVideo.fulfilled, (state, action) => {
        const { id, likes } = action.payload
        if (state.likedIds.includes(id)) {
          state.likedIds = state.likedIds.filter(i => i !== id)
        } else {
          state.likedIds.push(id)
        }
        if (state.current?.id === id) state.current.likes = likes
        const item = state.items.find(v => v.id === id)
        if (item) item.likes = likes
      })

      .addCase(searchVideos.pending, (state) => { state.searchLoading = true })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload.results
        state.searchQuery = action.payload.query
      })
      .addCase(searchVideos.rejected, (state) => { state.searchLoading = false })
  },
})

export const { clearCurrent, clearSearch, setSearchQuery } = videosSlice.actions
export default videosSlice.reducer
