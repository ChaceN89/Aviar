import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import postService from './postService'

const initialState = {
    post: null,  //shouldn't need to store status of a post 
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  }

// get
export const getPost = createAsyncThunk(
  'Posts/Post',
  async (post, thunkAPI) => {
    try {
      return await postService.getPost(post._id)
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

export const postSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getPost.pending, state => {
        state.isLoading = true
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collections = action.payload
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})


export const { reset } = postSlice.actions
export default postSlice.reducer
