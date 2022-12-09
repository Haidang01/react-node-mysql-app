import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api';
const initialState = {
  loading: false,
  error: '',
  likes: null,
  dataComment: [],
}
export const getComment = createAsyncThunk(
  'post/getComment',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.getComment(postId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const postComment = createAsyncThunk(
  'comment/addComment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.addComment(data);
      // toast.success()
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getComment.pending]: (state, action) => {
      state.loading = true;
    },
    [getComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataComment = action.payload;

    },
    [getComment.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [postComment.pending]: (state, action) => {
      state.loading = true;
    },
    [postComment.fulfilled]: (state, action) => {
      state.loading = false;
      // state.dataPost = action.payload;
    },
    [postComment.rejected]: (state, action) => {
      state.error = action.payload;
    },

  }
})

// Action creators are generated for each case reducer function
export const { } = commentSlice.actions

export default commentSlice.reducer;