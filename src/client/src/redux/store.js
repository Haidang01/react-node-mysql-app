import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice';
import postReducer from './features/postsSlice';
import commentReducer from './features/commentSlice'
import relationshipReducer from './features/relationshipSlice';
import userReducer from './features/userSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
    relationship: relationshipReducer,
    user: userReducer,
  },
})