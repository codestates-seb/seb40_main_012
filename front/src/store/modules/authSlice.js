import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn } from '../../api/authApi';
import { PURGE } from 'redux-persist';

const initialState = {
  loading: false,
  error: { status: null, message: '' },
  isLogin: false,
  firstLogin: false,
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLogin = false;
        state.firstLogin = false;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLogin = true;
        state.firstLogin = action.payload.firstLogin;
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
      })
      .addCase(PURGE, () => initialState);
  },
});

export const selectIsLogin = (state) => state.auth.isLogin;

export default authSlice.reducer;
