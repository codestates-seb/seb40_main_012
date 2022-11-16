import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { PAIRING_ALL_URL } from '../../api/requests';

const initialState = {
  data: [],
};

export const asyncGetPairing = createAsyncThunk(
  'pairingSlice/asyncGetPairing',
  async () => {
    return await axios.get(PAIRING_ALL_URL).then((res) => res.data.data);
  }
);
export const pairingSlice = createSlice({
  name: 'getPairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetPairing.pending, (state) => {
      //   console.log('pending', state, action);
      state.data = [];
    });
    builder.addCase(asyncGetPairing.fulfilled, (state, action) => {
      //   console.log('fulfilled', state, action);
      state.data = action.payload;
    });
    builder.addCase(asyncGetPairing.rejected, (state) => {
      //   console.log('reject', state, action);
      state.data = [];
    });
  },
});

export default pairingSlice.reducer;
