import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dashboardService from './dashboardService'

const initialState = {
    posts: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// get all posts 
export const getAllPosts = createAsyncThunk(
    'posts/',
    async (data, thunkAPI) => {
        try {
            return await dashboardService.getAllPosts()
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

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        reset: state => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(getAllPosts.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = dashboardSlice.actions
export default dashboardSlice.reducer
