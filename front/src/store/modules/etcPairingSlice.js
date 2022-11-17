import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import {
  PAIRING_ETC_LIKE_URL,
  PAIRING_ETC_NEWEST_URL,
} from '../../api/requests';

const initialState = {
  likeData: [],
  newestData: [],
  status: '',
};

export const asyncGetEtcPairingLike = createAsyncThunk(
  'pairingSlice/asyncGetEtcPairingLike',
  async () => {
    return await axios
      .get(PAIRING_ETC_LIKE_URL)
      .then((res) => res.data.data.content);
  }
);

export const asyncGetEtcPairingNewest = createAsyncThunk(
  'pairingSlice/asyncGetEtcPairingNewest',
  async () => {
    return await axios
      .get(PAIRING_ETC_NEWEST_URL)
      .then((res) => res.data.data.content);
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
      state.likeData = action.payload;
    });
    builder.addCase(asyncGetEtcPairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetEtcPairingNewest.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetEtcPairingNewest.fulfilled, (state, action) => {
      state.newestData = action.payload;
    });
    builder.addCase(asyncGetEtcPairingNewest.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default etcPairingSlice.reducer;
