import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get user's collections
export const getPosts = createAsyncThunk(
    'posts/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await postService.getPosts(token)
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
    name: 'posts',
    initialState,
    reducers: {
        reset: state => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(getPosts.pending, state => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.posts = null
            })
    }
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;