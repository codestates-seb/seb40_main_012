import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signUp } from '../../api/signUpAPI';

const initialState = {
  loading: false,
  error: null,
  nickName: '',
  email: '',
  password: '',
  passwordCheck: '',
};

export const checkDuplicateNickNameAsync = createAsyncThunk(
  'signUp/checkDuplicateNickName',
  async (nickName, thunkAPI) => {
    try {
      const response = await signUp(nickName);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage: error.response.data.message,
      });
    }
  }
);

export const checkDuplicateEmailAsync = createAsyncThunk(
  'signUp/checkDuplicateEmail',
  async (email, thunkAPI) => {
    try {
      const response = await signUp(email);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage: error.response.data.message,
      });
    }
  }
);

export const signUpAsync = createAsyncThunk(
  'signUp/signUp',
  async (params, thunkAPI) => {
    try {
      const response = await signUp(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage: error.response.data.message,
      });
    }
  }
);

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setInputValue: (state, { payload }) => {
      switch (payload.id) {
        case 'nickName':
          state.nickName = payload.value;
          break;
        case 'email':
          state.email = payload.value;
          break;
        case 'password':
          state.password = payload.value;
          break;
        case 'passwordCheck':
          state.passwordCheck = payload.value;
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(signUpAsync.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error;
        }
      });
  },
});
export const { setInputValue } = signUpSlice.actions;

export default signUpSlice.reducer;
