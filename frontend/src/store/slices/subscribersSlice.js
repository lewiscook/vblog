import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { subscribersApi } from '../../services/api'

export const subscribe = createAsyncThunk('subscribers/subscribe', async (data, { rejectWithValue }) => {
  try {
    return await subscribersApi.subscribe(data)
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Something went wrong. Please try again.')
  }
})

const subscribersSlice = createSlice({
  name: 'subscribers',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetSubscription: (state) => { state.loading = false; state.success = false; state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.pending, (state) => { state.loading = true; state.error = null; state.success = false })
      .addCase(subscribe.fulfilled, (state) => { state.loading = false; state.success = true })
      .addCase(subscribe.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  },
})

export const { resetSubscription } = subscribersSlice.actions
export default subscribersSlice.reducer
