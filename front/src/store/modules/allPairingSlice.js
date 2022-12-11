import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import {
  PAIRING_ALL_LIKE_URL,
  PAIRING_ALL_NEWEST_URL,
  PAIRING_ALL_RANDOM_URL,
} from '../../api/requests';

const initialState = {
  likeData: [],
  newestData: [],
  randomData: [],
  status: '',
};

export const asyncGetAllPairingLike = createAsyncThunk(
  'pairingSlice/asyncGetAllPairingLike',
  async () => {
    try {
      const res = await axios.get(PAIRING_ALL_LIKE_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetAllPairingNewest = createAsyncThunk(
  'pairingSlice/asyncGetAllPairingNewest',
  async () => {
    try {
      const res = await axios.get(PAIRING_ALL_NEWEST_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetAllPairingRandom = createAsyncThunk(
  'pairingSlice/asyncGetAllPairingRandom',
  async () => {
    try {
      const res = await axios.get(PAIRING_ALL_RANDOM_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const allPairingSlice = createSlice({
  name: 'getPairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetAllPairingLike.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetAllPairingLike.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.likeData = action.payload;
    });
    builder.addCase(asyncGetAllPairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetAllPairingNewest.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetAllPairingNewest.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.newestData = action.payload;
    });
    builder.addCase(asyncGetAllPairingNewest.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetAllPairingRandom.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetAllPairingRandom.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.randomData = action.payload;
    });
    builder.addCase(asyncGetAllPairingRandom.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default allPairingSlice.reducer;
