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

// Update collection name
export const updateCollectionName = createAsyncThunk(
  'collections/updateCollection',
  async (data, thunkAPI) => {
    try {
      const { id, name } = data
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.updateCollectionName(id, name, token)
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

// Delete user collection
export const deleteCollection = createAsyncThunk(
  'collections/deleteCollection',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.deleteCollection(id, token)
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

// Update collection name
export const addToCollection = createAsyncThunk(
  'collections/addToCollection',
  async (data, thunkAPI) => {
    try {
      const { pid, cid } = data
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.addPostToCollection(pid, cid, token)
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

// Update collection name
export const removeFromCollection = createAsyncThunk(
  'collections/removeFromCollection',
  async (data, thunkAPI) => {
    try {
      const { pid, cid } = data
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.removePostFromCollection(pid, cid, token)
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

// Update collection name
export const createCollection = createAsyncThunk(
  'collections/createCollection',
  async (data, thunkAPI) => {
    try {
      const { id, name } = data
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.createCollection(id, name, token)
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
    reset: () => initialState
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
      .addCase(updateCollectionName.pending, state => {
        state.isLoading = true
      })
      .addCase(updateCollectionName.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collections = action.payload
      })
      .addCase(updateCollectionName.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCollection.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collections = action.payload
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addToCollection.pending, state => {
        state.isLoading = true
      })
      .addCase(addToCollection.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collections = action.payload
      })
      .addCase(addToCollection.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeFromCollection.pending, state => {
        state.isLoading = true
      })
      .addCase(removeFromCollection.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collections = action.payload
      })
      .addCase(removeFromCollection.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createCollection.pending, state => {
        state.isLoading = true
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collections = action.payload
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = collectionSlice.actions
export default collectionSlice.reducer
