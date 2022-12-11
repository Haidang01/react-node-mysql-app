import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api';
const initialState = {
  loading: false,
  error: '',
  usersAll: [],
}
export const UserAll = createAsyncThunk(
  'user/UserAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllUser()
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })

export const userSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {

  },
  extraReducers: {
    [UserAll.pending]: (state, action) => {
      state.loading = true;
    },
    [UserAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersAll = action.payload;
    },
    [UserAll.rejected]: (state, action) => {
      state.error = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer;