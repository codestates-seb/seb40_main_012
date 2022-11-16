import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn } from '../../api/signInAPI';
import axios from '../../api/axios';

const initialState = {
  loading: false,
  error: null,
  inputValue: { email: '', password: '' },
  inputStatus: { email: '', password: '' },
  inputHelperText: { email: '', password: '' },
  isLogin: false,
  firstLogin: false,
};

export const signInAsync = createAsyncThunk(
  'signIn/getTokens',
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

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setInputValue: (state, { payload }) => {
      state.inputValue[payload.id] = payload.value;
    },
    setInputStatus: (state, { payload }) => {
      for (const ele of payload) {
        state.inputStatus[ele.id] = ele.inputStatus;
        state.inputHelperText[ele.id] = ele.inputHelperText;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.isLogin = false;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.isLogin = true;
        state.firstLogin = action.payload.data.firstLogin;
        state.inputValue = { email: '', password: '' };
        state.inputStatus = { email: '', password: '' };
        state.inputHelperText = { email: '', password: '' };
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error;
        }
      });
  },
});

export const { setInputValue, setInputStatus } = signInSlice.actions;

export const setIsValid = (id, value, required) => (dispatch) => {
  if (required && value.length <= 0) {
    dispatch(
      setInputStatus([
        { id, inputStatus: 'error', inputHelperText: '필수 정보입니다.' },
      ])
    );
    return;
  }
  dispatch(setInputStatus([{ id, inputStatus: '', inputHelperText: '' }]));
};

export const selectValidCheckArray = (state) => {
  const { inputStatus, inputValue } = state.signIn;
  const arr = [];
  Object.entries(inputStatus).forEach(([key, value]) => {
    if (value === 'error') arr.push(key);
  });
  Object.entries(inputValue).forEach(([key, value]) => {
    if (value.length > 0) return;
    if (arr.includes(key)) return;
    arr.push(key);
  });

  return arr;
};

export default signInSlice.reducer;
