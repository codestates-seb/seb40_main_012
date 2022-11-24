import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import {
  PAIRING_MUSIC_LIKE_URL,
  PAIRING_MUSIC_NEWEST_URL,
} from '../../api/requests';

const initialState = {
  likeData: [],
  newestData: [],
  status: '',
};

export const asyncGetMusicPairingLike = createAsyncThunk(
  'pairingSlice/asyncGetMusicPairingLike',
  async () => {
    try {
      const res = await axios.get(PAIRING_MUSIC_LIKE_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetMusicPairingNewest = createAsyncThunk(
  'pairingSlice/asyncGetMusicPairingNewest',
  async () => {
    try {
      const res = await axios.get(PAIRING_MUSIC_NEWEST_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const musicPairingSlice = createSlice({
  name: 'getPairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetMusicPairingLike.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetMusicPairingLike.fulfilled, (state, action) => {
      state.likeData = action.payload;
    });
    builder.addCase(asyncGetMusicPairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetMusicPairingNewest.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetMusicPairingNewest.fulfilled, (state, action) => {
      state.newestData = action.payload;
    });
    builder.addCase(asyncGetMusicPairingNewest.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default musicPairingSlice.reducer;
