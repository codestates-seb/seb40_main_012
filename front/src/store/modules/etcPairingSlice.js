import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import {
  PAIRING_ETC_LIKE_URL,
  PAIRING_ETC_NEWEST_URL,
  PAIRING_ETC_RANDOM_URL,
} from '../../api/requests';

const initialState = {
  likeData: [],
  newestData: [],
  randomData: [],
  status: '',
};

export const asyncGetEtcPairingLike = createAsyncThunk(
  'pairingSlice/asyncGetEtcPairingLike',
  async () => {
    try {
      const res = await axios.get(PAIRING_ETC_LIKE_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetEtcPairingNewest = createAsyncThunk(
  'pairingSlice/asyncGetEtcPairingNewest',
  async () => {
    try {
      const res = await axios.get(PAIRING_ETC_NEWEST_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetEtcPairingRandom = createAsyncThunk(
  'pairingSlice/asyncGetEtcPairingRandom',
  async () => {
    try {
      const res = await axios.get(PAIRING_ETC_RANDOM_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const etcPairingSlice = createSlice({
  name: 'getPairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetEtcPairingLike.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetEtcPairingLike.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.likeData = action.payload;
    });
    builder.addCase(asyncGetEtcPairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetEtcPairingNewest.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetEtcPairingNewest.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.newestData = action.payload;
    });
    builder.addCase(asyncGetEtcPairingNewest.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetEtcPairingRandom.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetEtcPairingRandom.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.randomData = action.payload;
    });
    builder.addCase(asyncGetEtcPairingRandom.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default etcPairingSlice.reducer;
