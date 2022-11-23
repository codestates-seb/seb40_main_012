import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, firstLogin } from '../../api/authApi';
import { PURGE } from 'redux-persist';

const initialState = {
  loading: false,
  error: { status: null, message: '' },
  isLogin: false,
  firstLogin: false,
  nickName: '',
  email: '',
  roles: [],
};

export const signInAsync = createAsyncThunk(
  'auth/getTokens',
  async (params, thunkAPI) => {
    try {
      const response = await signIn(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const firstLoginAsync = createAsyncThunk(
  'auth/firstLogin',
  async (params, thunkAPI) => {
    try {
      const response = await firstLogin(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLogin = false;
        state.firstLogin = false;
        state.nickName = '';
        state.email = '';
        state.roles = [];
      })
      .addCase(signInAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.isLogin = true;
        state.firstLogin = payload.firstLogin;
        state.nickName = payload.nickName;
        state.email = payload.email;
        state.roles = payload.roles;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error;
        }
        state.isLogin = false;
        state.firstLogin = false;
        state.nickName = '';
        state.email = '';
        state.roles = [];
      })
      .addCase(firstLoginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLogin = false;
        state.firstLogin = false;
        state.nickName = '';
        state.email = '';
        state.roles = [];
      })
      .addCase(firstLoginAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.isLogin = true;
        state.firstLogin = payload.firstLogin;
      })
      .addCase(firstLoginAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error;
        }
        state.isLogin = false;
        state.firstLogin = false;
        state.nickName = '';
        state.email = '';
        state.roles = [];
      })
      .addCase(PURGE, () => initialState);
  },
});

export const selectIsLogin = (state) => state.auth.isLogin;
export const selectFirstLogin = (state) =>
  state.auth.firstLogin && state.auth.isLogin;
export const selectEmail = (state) => state.auth.email;
export const selectnickName = (state) => state.auth.nickName;

export default authSlice.reducer;
