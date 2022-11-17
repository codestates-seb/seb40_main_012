import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signUp } from '../../api/signUpAPI';

const initialState = {
  loading: false,
  error: null,
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

export const duplicationCheckSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    // .addCase(signUpAsync.pending, (state) => {
    //   state.error = null;
    //   state.loading = true;
    // })
    // .addCase(signUpAsync.fulfilled, (state) => {
    //   state.error = null;
    //   state.loading = false;
    // })
    // .addCase(signUpAsync.rejected, (state, action) => {
    //   state.loading = false;
    //   if (action.payload) {
    //     state.error = action.payload.errorMessage;
    //   } else {
    //     state.error = action.error;
    //   }
    // });
  },
});

export default duplicationCheckSlice.reducer;
