import { createSlice } from '@reduxjs/toolkit';
import { validationCheck } from '../../util/util';

const initialState = {
  loading: false,
  error: null,
  inputValue: { currentPassword: '', password: '', passwordCheck: '' },
  inputStatus: { currentPassword: '', password: '', passwordCheck: '' },
  inputHelperText: { currentPassword: '', password: '', passwordCheck: '' },
};

export const changePassWd = createSlice({
  name: 'changePassWd',
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
});

export const { setInputValue, setInputStatus } = changePassWd.actions;

export const setIsValid = (id, value, required) => (dispatch) => {
  const { test, errorMessage } = validationCheck(undefined, value, required);
  if (!test) {
    dispatch(
      setInputStatus([
        { id, inputStatus: 'error', inputHelperText: errorMessage },
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

export default changePassWd.reducer;
