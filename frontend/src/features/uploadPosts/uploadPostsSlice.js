import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import uploadPostsService from './uploadPostsService'

const initialState = {
    post: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  }

// Upload Post
export const uploadPost = createAsyncThunk(
    'posts/uploadPosts',
    async (post, thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await uploadPostsService.uploadPost(post,token)
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
    name: 'posts',
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
