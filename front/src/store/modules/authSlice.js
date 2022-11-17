import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn } from '../../api/signInAPI';
import axios from '../../api/axios';

const initialState = {
  loading: false,
  error: null,
  isLogin: false,
  firstLogin: false,
};

export const signInAsync = createAsyncThunk(
  'auth/getTokens',
  async (params, thunkAPI) => {
    try {
      const response = await signIn(params);
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + response.headers.authorization;

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage: error.response.data.message,
      });
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
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLogin = true;
        state.firstLogin = action.payload.data.firstLogin;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error;
        }
        state.isLogin = false;
        state.firstLogin = action.payload.data.firstLogin;
      });
  },
});

export default authSlice.reducer;
