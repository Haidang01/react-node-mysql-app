import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api';
const initialState = {
  loading: false,
  error: '',
  dataRelationships: [],
}
export const getRelationship = createAsyncThunk(
  'relationship/getRelationship',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getRelationships(userId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const followUser = createAsyncThunk(
  'relationship/followUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.addRelationship(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })

export const relationshipSlice = createSlice({
  name: 'relationship',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getRelationship.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelationship.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataRelationships = action.payload;
    },
    [getRelationship.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [followUser.pending]: (state, action) => {
      state.loading = true;
    },
    [followUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [followUser.rejected]: (state, action) => {
      state.error = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { } = relationshipSlice.actions

export default relationshipSlice.reducer;