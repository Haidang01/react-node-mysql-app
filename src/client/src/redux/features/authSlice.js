import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api';
const initialState = {
  loading: false,
  error: '',
  dataUser: {},
  dataProfile: {},
}
export const register = createAsyncThunk(
  'auth/register',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.register(data);
      toast.success("Register Success");
      navigate('/login');
      return response.data;
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data)
    }
  })
export const login = createAsyncThunk(
  'auth/login',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.login(data);
      toast.success("Login successful!");
      navigate('/');
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getProfile(userId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const logout = createAsyncThunk(
  'auth/logout',
  async ({ navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.logout();
      toast.success("Logout successful!");
      navigate('/login');
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })
export const editUser = createAsyncThunk(
  'auth/editUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.updateUser(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.dataUser = action.payload;
    },
    setDataProfile: (state, action) => {
      state.dataUser = action.payload;
      localStorage.removeItem('profile');
      localStorage.setItem('profile', JSON.stringify(action.payload));
    }
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      const { user, token } = action.payload;
      console.log(action.payload);
      state.dataUser = user;
      if (token || user) {
        localStorage.setItem('profile', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
      }
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [logout.pending]: (state, action) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.clear();
      state.dataUser = null;
    },
    [logout.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [fetchProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataProfile = action.payload;
    },
    [fetchProfile.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [editUser.pending]: (state, action) => {
      state.loading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.removeItem('profile');
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },
    [editUser.rejected]: (state, action) => {
      state.error = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, setDataProfile } = authSlice.actions

export default authSlice.reducer;