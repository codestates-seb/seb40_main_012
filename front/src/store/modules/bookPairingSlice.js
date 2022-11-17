import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import {
  PAIRING_BOOK_LIKE_URL,
  PAIRING_BOOK_NEWEST_URL,
} from '../../api/requests';

const initialState = {
  likeData: [],
  newestData: [],
  status: '',
};

export const asyncGetBookPairingLike = createAsyncThunk(
  'pairingSlice/asyncGetBookPairingLike',
  async () => {
    return await axios
      .get(PAIRING_BOOK_LIKE_URL)
      .then((res) => res.data.data.content);
  }
);

export const asyncGetBookPairingNewest = createAsyncThunk(
  'pairingSlice/asyncGetBookPairingNewest',
  async () => {
    return await axios
      .get(PAIRING_BOOK_NEWEST_URL)
      .then((res) => res.data.data.content);
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
      state.likeData = action.payload;
    });
    builder.addCase(asyncGetBookPairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetBookPairingNewest.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetBookPairingNewest.fulfilled, (state, action) => {
      state.newestData = action.payload;
    });
    builder.addCase(asyncGetBookPairingNewest.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default bookPairingSlice.reducer;
