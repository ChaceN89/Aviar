import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import collectionReducer from '../features/collections/collectionSlice'
import uploadReducer from '../features/uploadPosts/uploadPostsSlice'
import postReducer from '../features/posts/postSlice'
import postsReducer from '../features/dashboard/dashboardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionReducer,
    uploadPosts: uploadReducer,
    post: postReducer,
    posts: postsReducer
  }
})
