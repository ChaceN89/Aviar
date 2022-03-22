import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import collectionService from './collectionService'

const initialState = {
  collections: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Get user's collections
export const getCollections = createAsyncThunk(
  'collections/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.getCollections(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getCollections.pending, state => {
        state.isLoading = true
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collections = action.payload
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = collectionSlice.actions
export default collectionSlice.reducer
