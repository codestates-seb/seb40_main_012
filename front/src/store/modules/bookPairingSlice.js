import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import {
  PAIRING_BOOK_LIKE_URL,
  PAIRING_BOOK_NEWEST_URL,
  PAIRING_BOOK_RANDOM_URL,
} from '../../api/requests';

const initialState = {
  likeData: [],
  newestData: [],
  randomData: [],
  status: '',
};

export const asyncGetBookPairingLike = createAsyncThunk(
  'pairingSlice/asyncGetBookPairingLike',
  async () => {
    try {
      const res = await axios.get(PAIRING_BOOK_LIKE_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetBookPairingNewest = createAsyncThunk(
  'pairingSlice/asyncGetBookPairingNewest',
  async () => {
    try {
      const res = await axios.get(PAIRING_BOOK_NEWEST_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetBookPairingRandom = createAsyncThunk(
  'pairingSlice/asyncGetBookPairingRandom',
  async () => {
    try {
      const res = await axios.get(PAIRING_BOOK_RANDOM_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bookPairingSlice = createSlice({
  name: 'getPairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetBookPairingLike.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetBookPairingLike.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.likeData = action.payload;
    });
    builder.addCase(asyncGetBookPairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetBookPairingNewest.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetBookPairingNewest.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.newestData = action.payload;
    });
    builder.addCase(asyncGetBookPairingNewest.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetBookPairingRandom.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetBookPairingRandom.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.randomData = action.payload;
    });
    builder.addCase(asyncGetBookPairingRandom.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default bookPairingSlice.reducer;
