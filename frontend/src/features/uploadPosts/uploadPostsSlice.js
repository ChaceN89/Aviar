import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import uploadPostsService from './uploadPostsService'

const initialState = {
    post: null,  //shouldn't need to store status of a post 
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  }


/**
 
pending: uploadPosts/uploadPost/pending
fulfilled: uploadPosts/uploadPost/fulfilled
rejected: uploadPosts/uploadPost/rejected


 */


// Upload Post
export const uploadPost = createAsyncThunk(
  'uploadPosts/uploadPost',
  async (post, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await uploadPostsService.uploadPost(post, token)
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

export const uploadPostSlice = createSlice({
  name: 'uploadPosts',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(uploadPost.pending, state => {
        state.isLoading = true
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collections = action.payload
      })
      .addCase(uploadPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})


export const { reset } = uploadPostSlice.actions
export default uploadPostSlice.reducer
