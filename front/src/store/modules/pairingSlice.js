import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { PAIRING_URL } from '../../api/requests';

const initialState = {
  data: [],
  status: 'start',
};

export const asyncGetOnePairing = createAsyncThunk(
  'pairingSlice/asyncGetOnePairing',
  async (pairingId) => {
    return await axios.get(`${PAIRING_URL}/${pairingId}`).then((res) => {
      console.log(res.data.data.content);
      return res.data.data;
    });
  }
);

export const pairingSlice = createSlice({
  name: 'getPairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetOnePairing.pending, (state) => {
      //   console.log('pending', state, action);
      state.status = 'pending';
    });
    builder.addCase(asyncGetOnePairing.fulfilled, (state, action) => {
      //   console.log('fulfilled', state, action);
      state.data = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(asyncGetOnePairing.rejected, (state) => {
      //   console.log('reject', state, action);
      state.data = [];
      state.status = 'rejected';
    });
  },
});

export default pairingSlice.reducer;
