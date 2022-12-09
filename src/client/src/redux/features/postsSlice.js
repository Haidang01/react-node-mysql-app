import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api';
const initialState = {
  loading: false,
  error: '',
  dataPost: [],
}
export const getPosts = createAsyncThunk(
  'post/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getPosts()
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const getPostCurrent = createAsyncThunk(
  'post/getPostCurrent',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getPostCurrent(userId)
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const removePost = createAsyncThunk(
  'post/removePost',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const response = await api.deletePost(postId, userId)
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const sharePost = createAsyncThunk(
  'post/sharePost',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.sharePost(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getPostCurrent.pending]: (state, action) => {
      state.loading = true;
    },
    [getPostCurrent.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataPost = action.payload;
    },
    [getPostCurrent.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataPost = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [sharePost.pending]: (state, action) => {
      state.loading = true;
    },
    [sharePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataPost = action.payload;
    },
    [sharePost.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [removePost.pending]: (state, action) => {
      state.loading = true;
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [removePost.rejected]: (state, action) => {
      state.error = action.payload;
    },

  }
})

// Action creators are generated for each case reducer function
export const { } = postSlice.actions

export default postSlice.reducer;