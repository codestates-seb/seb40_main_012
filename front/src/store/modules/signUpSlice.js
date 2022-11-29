import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signUpApi } from 'api';
import { validationCheck, duplicationCheck } from 'util/util';

const initialState = {
  loading: false,
  error: null,
  inputValue: { nickName: '', email: '', password: '', passwordCheck: '' },
  inputStatus: { nickName: '', email: '', password: '', passwordCheck: '' },
  inputHelperText: { nickName: '', email: '', password: '', passwordCheck: '' },
};

export const signUpAsync = createAsyncThunk(
  'signUp/signUp',
  async (params, thunkAPI) => {
    try {
      const response = await signUpApi.signUp(params);
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

export const { setInputValue, setInputStatus } = signUpSlice.actions;

export const setIsValid = (id, value, required) => (dispatch) => {
  const { test, errorMessage } = validationCheck(id, value, required);
  if (!test) {
    dispatch(
      setInputStatus([
        { id, inputStatus: 'error', inputHelperText: errorMessage },
      ])
    );
    return;
  }

  switch (id) {
    case 'nickName':
      dispatch(isValidNickName(id, value));
      break;
    case 'email':
      dispatch(isValidEmail(id, value));
      break;
    case 'password':
      dispatch(isValidPassword(id));
      break;
    case 'passwordCheck':
      dispatch(isValidPasswordCheck(id, value));
      break;
    default:
      break;
  }
};

const isValidNickName = (id, value) => async (dispatch) => {
  try {
    const response = await duplicationCheck(id, value);
    const { status, message } = response;
    dispatch(
      setInputStatus([{ id, inputStatus: status, inputHelperText: message }])
    );
  } catch (error) {
    const { status, message } = error;
    dispatch(
      setInputStatus([{ id, inputStatus: status, inputHelperText: message }])
    );
  }
};

const isValidEmail = (id, value) => async (dispatch) => {
  try {
    const response = await duplicationCheck(id, value);
    const { status, message } = response;
    dispatch(
      setInputStatus([{ id, inputStatus: status, inputHelperText: message }])
    );
  } catch (error) {
    const { status, message } = error;
    dispatch(
      setInputStatus([{ id, inputStatus: status, inputHelperText: message }])
    );
  }
};

const isValidPassword = (id) => (dispatch) => {
  dispatch(setInputStatus([{ id, inputStatus: '', inputHelperText: '' }]));
};

const selectInputValue = (state) => state.signUp.inputValue;

const isValidPasswordCheck = (id, value) => (dispatch, getState) => {
  const { password } = selectInputValue(getState());
  if (value !== password) {
    dispatch(
      setInputStatus([
        {
          id,
          inputStatus: 'error',
          inputHelperText: '비밀번호가 일치하지 않습니다.',
        },
      ])
    );
    return;
  }

  dispatch(setInputStatus([{ id, inputStatus: '', inputHelperText: '' }]));
};

export const selectValidCheckArray = (state) => {
  const { inputStatus, inputValue } = state.signUp;
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

export default signUpSlice.reducer;
