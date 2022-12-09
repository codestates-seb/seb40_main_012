import { PURGE } from 'redux-persist';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi, myPageApi } from 'api';

const initialState = {
  loading: false,
  isLogin: false,
  firstLogin: false,
  nickName: '',
  email: '',
  roles: [],
  profileImage: '',
};

export const signInAsync = createAsyncThunk(
  'auth/getTokens',
  async (params, thunkAPI) => {
    try {
      const response = await authApi.signIn(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const firstLoginAsync = createAsyncThunk(
  'auth/firstLogin',
  async (params, thunkAPI) => {
    try {
      const response = await authApi.firstLogin(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const patchUserInfoAsync = createAsyncThunk(
  'auth/patchUserInfo',
  async (data, thunkAPI) => {
    try {
      const response = await myPageApi.patchUserInfo(data.params);
      return { ...response, ...data.userInfo };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        state.isLogin = false;
        state.firstLogin = false;
        state.nickName = '';
        state.email = '';
        state.roles = [];
        state.profileImage = '';
      })
      .addCase(signInAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLogin = true;
        state.firstLogin = payload.firstLogin;
        state.nickName = payload.nickName;
        state.email = payload.email;
        state.roles = payload.roles;
        state.profileImage = payload.profileImage;
      })
      .addCase(signInAsync.rejected, (state) => {
        state.loading = false;
        state.isLogin = false;
        state.firstLogin = false;
        state.nickName = '';
        state.email = '';
        state.roles = [];
        state.profileImage = '';
      })
      .addCase(firstLoginAsync.pending, (state) => {
        state.loading = true;
        state.isLogin = false;
        state.firstLogin = false;
        state.nickName = '';
        state.email = '';
        state.roles = [];
        state.profileImage = '';
      })
      .addCase(firstLoginAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLogin = true;
        state.firstLogin = payload.firstLogin;
        state.nickName = payload.nickName;
        state.email = payload.email;
        state.roles = payload.roles;
        state.profileImage = payload.profileImage;
      })
      .addCase(firstLoginAsync.rejected, (state) => {
        state.loading = false;
        state.isLogin = false;
        state.firstLogin = false;
        state.nickName = '';
        state.email = '';
        state.roles = [];
        state.profileImage = '';
      })
      .addCase(patchUserInfoAsync.pending, (state) => {
        state.loading = true;
        state.isLogin = true;
        state.firstLogin = false;
      })
      .addCase(patchUserInfoAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLogin = true;
        state.firstLogin = false;
        state.nickName = payload.nickname;
        state.email = payload.email;
        state.roles = payload.roles;
        state.profileImage = payload.profileImage;
      })
      .addCase(patchUserInfoAsync.rejected, (state) => {
        state.loading = false;
        state.isLogin = true;
        state.firstLogin = false;
      })
      .addCase(PURGE, () => initialState);
  },
});

export const selectIsLogin = (state) => state.auth.isLogin;
export const selectFirstLogin = (state) =>
  state.auth.firstLogin && state.auth.isLogin;
export const selectEmail = (state) => state.auth.email;
export const selectnickName = (state) => state.auth.nickName;
export const selectProfileImage = (state) => state.auth.profileImage;

export default authSlice.reducer;
