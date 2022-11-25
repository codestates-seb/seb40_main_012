import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import {
  PAIRING_FILM_LIKE_URL,
  PAIRING_FILM_NEWEST_URL,
} from '../../api/requests';

const initialState = {
  likeData: [],
  newestData: [],
  status: '',
};

export const asyncGetFilmPairingLike = createAsyncThunk(
  'pairingSlice/asyncGetFilmPairingLike',
  async () => {
    try {
      const res = await axios.get(PAIRING_FILM_LIKE_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncGetFilmPairingNewest = createAsyncThunk(
  'pairingSlice/asyncGetFilmPairingNewest',
  async () => {
    try {
      const res = await axios.get(PAIRING_FILM_NEWEST_URL);
      return res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const filmPairingSlice = createSlice({
  name: 'getPairing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetFilmPairingLike.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetFilmPairingLike.fulfilled, (state, action) => {
      state.likeData = action.payload;
    });
    builder.addCase(asyncGetFilmPairingLike.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(asyncGetFilmPairingNewest.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(asyncGetFilmPairingNewest.fulfilled, (state, action) => {
      state.newestData = action.payload;
    });
    builder.addCase(asyncGetFilmPairingNewest.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default filmPairingSlice.reducer;
