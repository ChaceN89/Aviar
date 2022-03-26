import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import postService from './postService'

const initialState = {
    post: null,  //shouldn't need to store status of a post 
    isError: false,
    isSuccess: false,
    commentAdded: false,
    isLoading: false,
    message: ''
  }
 
// get a post 
export const getPost = createAsyncThunk(
  'posts/post',
  async (data, thunkAPI) => {
    try {
      const { id } = data 
      return await postService.getPost(id)
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

export const addComment = createAsyncThunk(
  'posts/addComment',
  async (data, thunkAPI) => {
    try {
      const { postId, newComment } = data
      const token = thunkAPI.getState().auth.user.token
      return await postService.addComment(postId, newComment, token)
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
  name: 'post',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getPost.pending, state => {
        state.isLoading = true
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.post = action.payload
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addComment.pending, state => {
        state.isLoading = true
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.commentAdded = true
        
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
     
  }
})

export const { reset } = postSlice.actions
export default postSlice.reducer
