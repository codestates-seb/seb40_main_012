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
      return res.data.data;
    });
  }
);

export const asyncPostPairing = createAsyncThunk(
  'pairingSlice/asyncPostPairing',
  async (pairingPostBody) => {
    console.log('axios.defaults.headers', axios.defaults.headers);
    return await axios
      .post(`/api/books/1/pairings/add`, pairingPostBody)
      .then((res) => {
        console.log('성공', res);
      })
      .catch((err) => {
        console.log('post 실패', err);
      });
  }
);

export const pairingSlice = createSlice({
  name: 'pairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetOnePairing.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetOnePairing.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(asyncGetOnePairing.rejected, (state) => {
      state.data = [];
      state.status = 'rejected';
    });
    builder.addCase(asyncPostPairing.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncPostPairing.fulfilled, (state) => {
      state.status = 'fulfilled';
    });
    builder.addCase(asyncPostPairing.rejected, (state) => {
      state.data = [];
      state.status = 'rejected';
    });
  },
});

export default pairingSlice.reducer;
