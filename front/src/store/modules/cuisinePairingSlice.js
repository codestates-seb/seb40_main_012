import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import {
  PAIRING_CUISINE_LIKE_URL,
  PAIRING_CUISINE_NEWEST_URL,
  PAIRING_CUISINE_RANDOM_URL,
} from '../../api/requests';

const initialState = {
  likeData: [],
  newestData: [],
  randomData: [],
  status: '',
};

export const asyncGetCuisinePairingLike = createAsyncThunk(
  'pairingSlice/asyncGetCuisinePairingLike',
  async () => {
    try {
      const res = await axios.get(PAIRING_CUISINE_LIKE_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetCuisinePairingNewest = createAsyncThunk(
  'pairingSlice/asyncGetCuisinePairingNewest',
  async () => {
    try {
      const res = await axios.get(PAIRING_CUISINE_NEWEST_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetCuisinePairingRandom = createAsyncThunk(
  'pairingSlice/asyncGetCuisinePairingRandom',
  async () => {
    try {
      const res = await axios.get(PAIRING_CUISINE_RANDOM_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
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
      state.status = 'fulfilled';
      state.likeData = action.payload;
    });
    builder.addCase(asyncGetCuisinePairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetCuisinePairingNewest.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetCuisinePairingNewest.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.newestData = action.payload;
    });
    builder.addCase(asyncGetCuisinePairingNewest.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetCuisinePairingRandom.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetCuisinePairingRandom.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.randomData = action.payload;
    });
    builder.addCase(asyncGetCuisinePairingRandom.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default cuisinePairingSlice.reducer;
