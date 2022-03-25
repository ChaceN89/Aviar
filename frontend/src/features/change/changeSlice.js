import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import changeService from './changeService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Change username
//This doesn't yet send in the new username, need to figure out how to do that, same with function below
export const newName = createAsyncThunk('myAccount/something', async (username, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await changeService.newPass(username, token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Change password
export const newPass = createAsyncThunk('myAccount/something', async (password, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await changeService.newPass(password, token)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

// Delete user
export const deleteAccount = createAsyncThunk('myAccount/something', async (thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await changeService.delUser(token)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

export const changeSlice = createSlice({
    name: 'create',
    initialState,
    reducers: {
      reset: state => initialState
    },
    extraReducers: builder => {
      builder
        .addCase(newName.pending, state => {
          state.isLoading = true
        })
        .addCase(newName.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(newName.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(newPass.pending, state => {
          state.isLoading = true
        })
        .addCase(newPass.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(newPass.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
    }
})

export const { reset } = changeSlice.actions
