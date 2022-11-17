import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import {
  PAIRING_CUISINE_LIKE_URL,
  PAIRING_CUISINE_NEWEST_URL,
} from '../../api/requests';

const initialState = {
  likeData: [],
  newestData: [],
  status: '',
};

export const asyncGetCuisinePairingLike = createAsyncThunk(
  'pairingSlice/asyncGetCuisinePairingLike',
  async () => {
    return await axios
      .get(PAIRING_CUISINE_LIKE_URL)
      .then((res) => res.data.data.content);
  }
);

export const asyncGetCuisinePairingNewest = createAsyncThunk(
  'pairingSlice/asyncGetCuisinePairingNewest',
  async () => {
    return await axios
      .get(PAIRING_CUISINE_NEWEST_URL)
      .then((res) => res.data.data.content);
  }
);

export const cuisinePairingSlice = createSlice({
  name: 'getPairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetCuisinePairingLike.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetCuisinePairingLike.fulfilled, (state, action) => {
      state.likeData = action.payload;
    });
    builder.addCase(asyncGetCuisinePairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetCuisinePairingNewest.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetCuisinePairingNewest.fulfilled, (state, action) => {
      state.newestData = action.payload;
    });
    builder.addCase(asyncGetCuisinePairingNewest.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default cuisinePairingSlice.reducer;
