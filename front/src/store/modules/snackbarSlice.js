import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  severity: 'success', //"success","error","warning","info"
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setOpenSnackbar: (state, { payload }) => {
      state.open = true;
      state.severity = !payload.severity ? 'success' : payload.severity;
      state.message = !payload.message ? '' : payload.message;
    },
    setCloseSnackbar: (state) => {
      state.open = false;
      state.severity = 'success';
      state.message = '';
    },
  },
});

export const { setOpenSnackbar, setCloseSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
